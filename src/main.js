const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = 'http://api.aviationstack.com/v1/flights';

/**
 * UI Utilities for managing DOM elements
 */
const UI = {
  searchBtn: document.querySelector(".search-btn"),
  flightInput: document.querySelector(".flight-number"),
  resultCard: document.querySelector(".result-card"),
  
  setLoading(isLoading) {
    this.searchBtn.disabled = isLoading;
    this.searchBtn.textContent = isLoading ? "SEARCHING..." : "SEARCH FLIGHT";
    this.searchBtn.style.opacity = isLoading ? "0.7" : "1";
  },

  updateText(selector, text, fallback = "-") {
    const el = document.querySelector(selector);
    if (el) el.textContent = text || fallback;
  },

  hideResult() {
    this.resultCard.classList.add("hidden");
  },

  showResult() {
    this.resultCard.classList.remove("hidden");
  }
};

/**
 * Data Formatters
 */
const Formatter = {
  time(isoString) {
    if (!isoString) return "-";
    return new Date(isoString).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  },
  
  statusColor(status) {
    const colors = {
      landed: '#2bc155',    // Green
      cancelled: '#ef4444', // Red
      active: '#3b82f6',    // Blue
      scheduled: '#6b7b8c', // Grayish blue
      incident: '#f59e0b'   // Amber
    };
    return colors[status?.toLowerCase()] || '#6b7b8c';
  }
};

/**
 * Storage Utility for persisting data
 */
const Storage = {
  KEY: 'last_flight_search',

  save(flightData) {
    try {
      localStorage.setItem(this.KEY, JSON.stringify(flightData));
    } catch (e) {
      console.error("Storage Error:", e);
    }
  },

  get() {
    try {
      const data = localStorage.getItem(this.KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  }
};

/**
 * Main Flight Tracker Logic
 */
async function handleSearch(e) {
  e.preventDefault();

  const flightNumber = UI.flightInput.value.trim().toUpperCase();

  if (!flightNumber) {
    alert("Please enter a valid flight number.");
    return;
  }

  UI.setLoading(true);
  UI.hideResult();

  try {
    const url = `${BASE_URL}?access_key=${API_KEY}&flight_iata=${flightNumber}`;
    const response = await fetch(url);
    
    if (!response.ok) throw new Error("Network response was not ok");
    
    const data = await response.json();

    if (data.data && data.data.length > 0) {
      const flight = data.data[0];
      console.log(flight);
      renderFlightData(flight);
      Storage.save(flight); // Persist the result
      UI.showResult();
    } else {
      alert(`No active flight found for "${flightNumber}".`);
    }
  } catch (error) {
    console.error("Flight Tracker Error:", error);
    alert("Failed to fetch flight data. Please check your connection or API key.");
  } finally {
    UI.setLoading(false);
  }
}

/**
 * Renders the flight data to the UI
 */
function renderFlightData(flight) {
  // 1. Header Info
  UI.updateText(".res-flight-number", flight.flight.iata || flight.flight.icao);
  UI.updateText(".res-airline-name", `${flight.airline.name} (${flight.airline.iata || ''})`);
  
  // 2. Route Summary
  UI.updateText(".dep-iata", flight.departure.iata);
  UI.updateText(".dep-airport", flight.departure.airport);
  UI.updateText(".arr-iata", flight.arrival.iata);
  UI.updateText(".arr-airport", flight.arrival.airport);

  // 3. Status Badge
  const statusBg = document.querySelector(".status-bg");
  if (statusBg) {
    statusBg.style.backgroundColor = Formatter.statusColor(flight.flight_status);
  }
  UI.updateText(".res-status", flight.flight_status.toUpperCase());
  UI.updateText(".res-status-detail", flight.live?.is_ground ? "On Ground" : "In Air");

  // 4. Departure Details
  UI.updateText(".dep-airport-full", flight.departure.airport);
  UI.updateText(".dep-iata-small", flight.departure.iata);
  UI.updateText(".dep-icao", flight.departure.icao);
  UI.updateText(".dep-terminal", flight.departure.terminal);
  UI.updateText(".dep-gate", flight.departure.gate);
  
  // 5. Departure Timings Grid
  UI.updateText(".dep-scheduled", Formatter.time(flight.departure.scheduled));
  UI.updateText(".dep-estimated", Formatter.time(flight.departure.estimated));
  UI.updateText(".dep-actual", Formatter.time(flight.departure.actual));
  UI.updateText(".dep-runway", Formatter.time(flight.departure.estimated_runway));

  // 6. Arrival Details
  UI.updateText(".arr-airport-full", flight.arrival.airport);
  UI.updateText(".arr-iata-small", flight.arrival.iata);
  UI.updateText(".arr-icao", flight.arrival.icao);
  UI.updateText(".arr-terminal", flight.arrival.terminal);
  UI.updateText(".arr-gate", flight.arrival.gate);

  // 7. Arrival Timings Grid
  UI.updateText(".arr-scheduled", Formatter.time(flight.arrival.scheduled));
  UI.updateText(".arr-estimated", Formatter.time(flight.arrival.estimated));
  UI.updateText(".arr-actual", Formatter.time(flight.arrival.actual));
  UI.updateText(".arr-runway", Formatter.time(flight.arrival.estimated_runway));
}

// Event Listeners
UI.searchBtn.addEventListener("click", handleSearch);

// Initialize app: Restore last search
window.addEventListener('DOMContentLoaded', () => {
  const lastFlight = Storage.get();
  if (lastFlight) {
    renderFlightData(lastFlight);
    UI.showResult();
  }
});

