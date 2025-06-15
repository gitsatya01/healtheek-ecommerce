# HealthEek E-commerce Platform

A modern e-commerce platform built with Next.js, focusing on health and wellness products.

## Features

- 🛍️ Product catalog with categories and search
- 🔐 User authentication and authorization
- 🛒 Shopping cart functionality
- 👤 User account management
- 📱 Responsive design
- ⚡ Server-side rendering
- 🔒 Secure authentication
- 🎨 Modern UI with Tailwind CSS

## Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Authentication:** Custom auth system
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/healtheek-ecommerce.git
   cd healtheek-ecommerce
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory and add your environment variables:
   ```env
   NEXT_PUBLIC_AUTH_SECRET=your-auth-secret
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
healtheek-ecommerce/
├── app/                 # Next.js app directory
│   ├── account/        # User account pages
│   ├── admin/          # Admin dashboard
│   ├── products/       # Product pages
│   └── ...
├── components/         # React components
├── lib/               # Utility functions and configurations
├── public/            # Static assets
└── styles/            # Global styles
```

## Deployment

The project is configured for deployment on Vercel. To deploy:

1. Push your code to GitHub
2. Import the repository in Vercel
3. Configure environment variables
4. Deploy!

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter)

Project Link: [https://github.com/yourusername/healtheek-ecommerce](https://github.com/yourusername/healtheek-ecommerce) 