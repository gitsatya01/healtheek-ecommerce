"use client";

import React, { useState, useEffect } from "react";
import { useCart } from "@/components/cart/cart-context";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Loader2, 
  CreditCard, 
  Truck, 
  Shield, 
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  MapPin,
  Phone,
  Mail,
  User
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface BillingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface PaymentInfo {
  method: 'card' | 'cod' | 'upi';
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  cardName?: string;
  upiId?: string;
}

export default function CheckoutPage() {
  const { items, total: cartTotal, clearCart } = useCart();
  const { user, userData, loading: authLoading } = useAuth();
  const router = useRouter();
  
  const [billingInfo, setBillingInfo] = useState<BillingInfo>({
    firstName: "",
    lastName: "",
    email: userData?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India"
  });

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    method: 'cod'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [sameAsShipping, setSameAsShipping] = useState(true);

  // Redirect if cart is empty or user not authenticated
  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push("/login?redirect=/checkout");
      } else if (items.length === 0) {
        router.push("/cart");
      }
    }
  }, [user, items, authLoading, router]);

  // Update email when user data loads
  useEffect(() => {
    if (userData?.email) {
      setBillingInfo(prev => ({ ...prev, email: userData.email }));
    }
  }, [userData]);

  const handleBillingChange = (field: keyof BillingInfo, value: string) => {
    setBillingInfo(prev => ({ ...prev, [field]: value }));
  };

  const handlePaymentChange = (field: keyof PaymentInfo, value: string) => {
    setPaymentInfo(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const required = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'zipCode'];
    
    for (const field of required) {
      if (!billingInfo[field as keyof BillingInfo]) {
        setError(`Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return false;
      }
    }

    if (!agreeToTerms) {
      setError("Please agree to the terms and conditions");
      return false;
    }

    // Validate payment info
    if (paymentInfo.method === 'card') {
      if (!paymentInfo.cardNumber || !paymentInfo.expiryDate || !paymentInfo.cvv || !paymentInfo.cardName) {
        setError("Please fill in all card details");
        return false;
      }
    } else if (paymentInfo.method === 'upi') {
      if (!paymentInfo.upiId) {
        setError("Please enter UPI ID");
        return false;
      }
    }

    return true;
  };

  const calculateTotals = () => {
    const subtotal = cartTotal;
    const shipping = subtotal > 500 ? 0 : 50; // Free shipping over ₹500
    const tax = Math.round(subtotal * 0.18); // 18% GST
    const total = subtotal + shipping + tax;
    
    return { subtotal, shipping, tax, total };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const { subtotal, shipping, tax, total } = calculateTotals();
      
      // Create order object
      const orderData = {
        userId: user?.uid,
        userEmail: userData?.email,
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.primePrice || item.mrpPrice,
          quantity: item.quantity,
          image: item.image
        })),
        billingInfo,
        paymentInfo: {
          method: paymentInfo.method,
          // Don't store sensitive payment details
          ...(paymentInfo.method === 'upi' && { upiId: paymentInfo.upiId })
        },
        pricing: {
          subtotal,
          shipping,
          tax,
          total
        },
        status: paymentInfo.method === 'cod' ? 'confirmed' : 'pending',
        paymentStatus: paymentInfo.method === 'cod' ? 'pending' : 'processing',
        createdAt: serverTimestamp(),
        orderNumber: `ORD-${Date.now()}`
      };

      // Save order to Firestore
      const docRef = await addDoc(collection(db, "orders"), orderData);
      
      setOrderId(docRef.id);
      setSuccess(true);
      
      // Clear cart after successful order
      clearCart();
      
      // Redirect to success page after 3 seconds
      setTimeout(() => {
        router.push(`/order-success?orderId=${docRef.id}`);
      }, 3000);

    } catch (err: any) {
      console.error("Order creation error:", err);
      setError("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!user || items.length === 0) {
    return null;
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h2>
            <p className="text-gray-600 mb-4">
              Your order has been confirmed. You will receive an email confirmation shortly.
            </p>
            {orderId && (
              <p className="text-sm text-gray-500 mb-4">
                Order ID: {orderId}
              </p>
            )}
            <p className="text-sm text-gray-500">
              Redirecting to order confirmation...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { subtotal, shipping, tax, total } = calculateTotals();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <Link href="/cart">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Cart
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 ml-4">Checkout</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Billing Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Billing Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={billingInfo.firstName}
                        onChange={(e) => handleBillingChange('firstName', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={billingInfo.lastName}
                        onChange={(e) => handleBillingChange('lastName', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={billingInfo.email}
                        onChange={(e) => handleBillingChange('email', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone *</Label>
                      <Input
                        id="phone"
                        value={billingInfo.phone}
                        onChange={(e) => handleBillingChange('phone', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">Address *</Label>
                    <Input
                      id="address"
                      value={billingInfo.address}
                      onChange={(e) => handleBillingChange('address', e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={billingInfo.city}
                        onChange={(e) => handleBillingChange('city', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        value={billingInfo.state}
                        onChange={(e) => handleBillingChange('state', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="zipCode">ZIP Code *</Label>
                      <Input
                        id="zipCode"
                        value={billingInfo.zipCode}
                        onChange={(e) => handleBillingChange('zipCode', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <RadioGroup
                    value={paymentInfo.method}
                    onValueChange={(value) => setPaymentInfo(prev => ({ ...prev, method: value as 'card' | 'cod' | 'upi' }))}
                  >
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value="cod" id="cod" />
                      <Label htmlFor="cod" className="flex-1 cursor-pointer">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Cash on Delivery</p>
                            <p className="text-sm text-gray-500">Pay when you receive your order</p>
                          </div>
                          <Truck className="w-5 h-5 text-gray-400" />
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value="upi" id="upi" />
                      <Label htmlFor="upi" className="flex-1 cursor-pointer">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">UPI Payment</p>
                            <p className="text-sm text-gray-500">Pay using UPI ID</p>
                          </div>
                          <div className="text-2xl">📱</div>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex-1 cursor-pointer">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Credit/Debit Card</p>
                            <p className="text-sm text-gray-500">Secure payment with your card</p>
                          </div>
                          <CreditCard className="w-5 h-5 text-gray-400" />
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>

                  {/* UPI Details */}
                  {paymentInfo.method === 'upi' && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <Label htmlFor="upiId">UPI ID *</Label>
                      <Input
                        id="upiId"
                        placeholder="yourname@upi"
                        value={paymentInfo.upiId || ''}
                        onChange={(e) => handlePaymentChange('upiId', e.target.value)}
                        required
                      />
                    </div>
                  )}

                  {/* Card Details */}
                  {paymentInfo.method === 'card' && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg space-y-4">
                      <div>
                        <Label htmlFor="cardName">Cardholder Name *</Label>
                        <Input
                          id="cardName"
                          value={paymentInfo.cardName || ''}
                          onChange={(e) => handlePaymentChange('cardName', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="cardNumber">Card Number *</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={paymentInfo.cardNumber || ''}
                          onChange={(e) => handlePaymentChange('cardNumber', e.target.value)}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiryDate">Expiry Date *</Label>
                          <Input
                            id="expiryDate"
                            placeholder="MM/YY"
                            value={paymentInfo.expiryDate || ''}
                            onChange={(e) => handlePaymentChange('expiryDate', e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV *</Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            value={paymentInfo.cvv || ''}
                            onChange={(e) => handlePaymentChange('cvv', e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Terms and Conditions */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      checked={agreeToTerms}
                      onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                    />
                    <Label htmlFor="terms" className="text-sm leading-relaxed">
                      I agree to the{" "}
                      <Link href="/terms" className="text-blue-600 hover:underline">
                        Terms and Conditions
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-blue-600 hover:underline">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>
                </CardContent>
              </Card>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Items */}
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <div className="relative w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                        {item.image && (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {item.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-medium">
                        ₹{((item.primePrice || item.mrpPrice) * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Pricing */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax (GST 18%)</span>
                    <span>₹{tax.toLocaleString()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                </div>

                {/* Security Badge */}
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 pt-4">
                  <Shield className="w-4 h-4" />
                  <span>Secure checkout</span>
                </div>

                {/* Place Order Button */}
                <Button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full h-12 bg-green-600 hover:bg-green-700"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    `Place Order - ₹${total.toLocaleString()}`
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 