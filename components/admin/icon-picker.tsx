"use client"

import React, { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

interface IconPickerProps {
  selectedIcon: string
  onIconSelect: (iconPath: string, iconName: string) => void
}

interface IconData {
  name: string
  path: string
  category: string
}

const availableIcons: IconData[] = [
  // Health & Medical
  {
    name: "Heart",
    path: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
    category: "Health"
  },
  {
    name: "Medical Kit",
    path: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    category: "Health"
  },
  {
    name: "Pills",
    path: "M20.354 15.354A9 9 0 718.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z",
    category: "Health"
  },
  {
    name: "Brain",
    path: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
    category: "Health"
  },
  {
    name: "Eye",
    path: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
    category: "Health"
  },
  {
    name: "Pulse",
    path: "M22 12h-4l-3 9L9 3l-3 9H2",
    category: "Health"
  },
  {
    name: "First Aid",
    path: "M12 6v6m0 0v6m0-6h6m-6 0H6",
    category: "Health"
  },
  {
    name: "Stethoscope", 
    path: "M3 3v6a3 3 0 003 3h1m0 0a3 3 0 003-3V9a3 3 0 00-3-3h-1m0 12a3 3 0 003-3m0 0a3 3 0 00-3-3m0 3a3 3 0 01-3 3m6-3a3 3 0 013 3m-3-3h1.5a1.5 1.5 0 011.5 1.5V18a1.5 1.5 0 01-1.5 1.5H12m0 0v-6m6 0V9",
    category: "Health"
  },
  {
    name: "DNA",
    path: "M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M9.75 20.896a24.301 24.301 0 004.5 0m0 0v-5.714a2.25 2.25 0 00-.659-1.591L9.75 9.75m4.5 11.146c-.251-.023-.501-.05-.75-.082m.75.082V20.5a2.25 2.25 0 00-.659-1.591L19.8 15.3",
    category: "Health"
  },
  {
    name: "Lungs",
    path: "M8 12V8a4 4 0 118 0v4m-8 0a2 2 0 104 0m-4 0a2 2 0 11-4 0v-2a6 6 0 1112 0v2a2 2 0 11-4 0",
    category: "Health"
  },
  {
    name: "Kidney",
    path: "M8 21a5 5 0 01-5-5v-3a5 5 0 015-5 5 5 0 015 5v3a5 5 0 01-5 5zm0-10a2 2 0 00-2 2v3a2 2 0 104 0v-3a2 2 0 00-2-2z",
    category: "Health"
  },
  {
    name: "Blood Drop",
    path: "M12 2l3.09 6.26L22 9l-5.91.74L12 16l-4.09-6.26L2 9l5.91-.74L12 2z",
    category: "Health"
  },
  {
    name: "Thermometer",
    path: "M15 3a3 3 0 00-3 3v10a5 5 0 1010 0V6a3 3 0 00-3-3z",
    category: "Health"
  },
  {
    name: "Syringe",
    path: "m18 2 4 4-2 2-1-1-3 3-4-4 3-3-1-1 4-4zm-4 8L8 16l-2-2 6-6 2 2zm-3 5l2 2-6 6H4v-3l6-6z",
    category: "Health"
  },
  
  // People & Body
  {
    name: "User",
    path: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
    category: "People"
  },
  {
    name: "Users",
    path: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z",
    category: "People"
  },
  {
    name: "Baby",
    path: "M14.828 14.828a4 4 0 01-5.656 0M9 10h1.01M15 10h1.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    category: "People"
  },
  
  // Sports & Fitness
  {
    name: "Lightning",
    path: "M13 10V3L4 14h7v7l9-11h-7z",
    category: "Fitness"
  },
  {
    name: "Activity",
    path: "M22 12h-4l-3 9L9 3l-3 9H2",
    category: "Fitness"
  },
  {
    name: "Dumbbell",
    path: "M6 6h4l4 6-4 6H6l4-6L6 6z",
    category: "Fitness"
  },
  
  // Food & Nutrition
  {
    name: "Apple",
    path: "M12 2l3 7h7l-5.5 4L19 20l-7-5-7 5 2.5-7L2 9h7l3-7z",
    category: "Nutrition"
  },
  {
    name: "Leaf",
    path: "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z",
    category: "Nutrition"
  },
  
  // Business & Tools
  {
    name: "Briefcase",
    path: "M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z",
    category: "Business"
  },
  {
    name: "Tool",
    path: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
    category: "Business"
  },
  
  // Science & Medical
  {
    name: "Beaker",
    path: "M9 3v1H6l6 16h2L8 4h1V3h4zm1 5.5l1.5 2-1.5 2v-4z",
    category: "Science"
  },
  {
    name: "Microscope",
    path: "M6 20h12M6 16h12m-6-12v12m-3-6h6",
    category: "Science"
  },
  
  // General
  {
    name: "Star",
    path: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
    category: "General"
  },
  {
    name: "Check Circle",
    path: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    category: "General"
  }
]

const colorSchemes = [
  { name: "Healtheek Teal", value: "healtheek-teal", colors: "from-teal-600 to-emerald-600" },
  { name: "Health Green", value: "health-green", colors: "from-emerald-500 to-green-500" },
  { name: "Medical Blue", value: "medical-blue", colors: "from-blue-500 to-indigo-500" },
  { name: "Wellness Purple", value: "wellness-purple", colors: "from-purple-500 to-violet-500" },
  { name: "Heart Red", value: "heart-red", colors: "from-red-500 to-rose-500" },
  { name: "Vitality Orange", value: "vitality-orange", colors: "from-orange-500 to-amber-500" },
  { name: "Energy Yellow", value: "energy-yellow", colors: "from-yellow-500 to-amber-500" },
  { name: "Feminine Pink", value: "feminine-pink", colors: "from-pink-500 to-rose-500" },
  { name: "Fresh Cyan", value: "fresh-cyan", colors: "from-cyan-500 to-teal-500" },
  { name: "Neutral Gray", value: "neutral-gray", colors: "from-gray-500 to-slate-500" }
]

export function IconPicker({ selectedIcon, onIconSelect }: IconPickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>("All")

  const categories = ["All", ...Array.from(new Set(availableIcons.map(icon => icon.category)))]
  
  const filteredIcons = selectedCategory === "All" 
    ? availableIcons 
    : availableIcons.filter(icon => icon.category === selectedCategory)

  const selectedIconData = availableIcons.find(icon => icon.path === selectedIcon)

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Category Icon</label>
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between h-12"
            >
              <div className="flex items-center gap-2">
                {selectedIcon ? (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={selectedIcon} />
                    </svg>
                    <span>{selectedIconData?.name || "Custom Icon"}</span>
                  </>
                ) : (
                  <span className="text-gray-500">Select an icon</span>
                )}
              </div>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4" align="start">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">Filter by Category</label>
                <div className="flex flex-wrap gap-1">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-2 py-1 text-xs rounded-md transition-colors ${
                        selectedCategory === category
                          ? "bg-teal-100 text-teal-800 border border-teal-200"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-2 max-h-64 overflow-y-auto">
                {filteredIcons.map((icon) => (
                  <button
                    key={icon.name}
                    onClick={() => {
                      onIconSelect(icon.path, icon.name)
                      setIsOpen(false)
                    }}
                    className={`p-3 rounded-lg border transition-all hover:shadow-md ${
                      selectedIcon === icon.path
                        ? "border-teal-500 bg-teal-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    title={icon.name}
                  >
                    <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon.path} />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

export function ColorSchemePicker({ 
  selectedColorScheme, 
  onColorSchemeSelect 
}: { 
  selectedColorScheme: string
  onColorSchemeSelect: (colorScheme: string) => void 
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Color Scheme</label>
      <div className="grid grid-cols-5 gap-2">
        {colorSchemes.map((scheme) => (
          <button
            key={scheme.value}
            onClick={() => onColorSchemeSelect(scheme.value)}
            className={`p-2 rounded-lg border transition-all ${
              selectedColorScheme === scheme.value
                ? "border-gray-400 ring-2 ring-gray-300"
                : "border-gray-200 hover:border-gray-300"
            }`}
            title={scheme.name}
          >
            <div className={`w-full h-8 rounded bg-gradient-to-r ${scheme.colors}`} />
            <span className="text-xs text-gray-600 mt-1 block">{scheme.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
} 