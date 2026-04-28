# ✈️ FlightTracker — Real-Time Flight Tracking

A professional, high-performance flight tracking web application designed for simplicity and speed. Built with modern web technologies, it provides real-time updates on global flights including status, gate assignments, and precise arrival timings.

![Flight Tracker Preview](public/preview.png) *(Add your screenshot here)*

## 🌟 Features

- **Real-Time Tracking**: Fetch live flight data including status (Landed, Airborne, Scheduled, etc.).
- **Global Coverage**: Track flights from airlines worldwide using IATA/ICAO codes.
- **Smart Persistence**: Remembers your last searched flight using `localStorage` for a seamless experience on reload.
- **Detailed Insights**: View comprehensive details including Terminal, Gate, and a full timing grid (Scheduled vs. Actual).
- **Premium UI**: Sleek, glassmorphic Uber-style design with responsive layouts and Lucide icons.
- **Status Badges**: Dynamic color-coded badges for instant status recognition.

## 🛠️ Tech Stack

- **Frontend**: HTML5, Tailwind CSS 4 (Vite Plugin)
- **Logic**: Vanilla JavaScript (ES6+ Modules)
- **API**: [AviationStack API](https://aviationstack.com/)
- **Icons**: [Lucide Icons](https://lucide.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- An API Key from [AviationStack](https://aviationstack.com/product)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/flight-tracker.git
   cd flight-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory and add your AviationStack API Key:
   ```env
   VITE_API_KEY=your_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 📖 Usage

1. Enter a valid **Flight Number** (e.g., `UA2402`, `AA100`) in the search input.
2. Click **SEARCH FLIGHT**.
3. View the real-time status and detailed flight information.
4. Refresh the page anytime—the app will automatically restore your last search.

## 🛡️ License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ by [Mohammad Farhan Shaikh](https://github.com/Mohammad-Farhan-Shaikh)
