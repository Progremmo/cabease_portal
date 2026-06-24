"use client";

import React, { useState, useCallback, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { useTheme } from "next-themes";
// Remove skeleton import

const containerStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "0.5rem",
};

// Default to Pune coordinates as placeholder since seeder uses Pune
const defaultCenter = {
  lat: 18.5204,
  lng: 73.8567,
};

interface LiveMapProps {
  markers?: { id: string; lat: number; lng: number; title: string; color?: string }[];
  center?: { lat: number; lng: number };
  height?: string | number;
}

export function LiveMap({ markers = [], center = defaultCenter, height = 400 }: LiveMapProps) {
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "", // Must be provided in .env.local
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  // Fit bounds when markers change
  useEffect(() => {
    if (map && markers.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      markers.forEach(({ lat, lng }) => {
        bounds.extend({ lat, lng });
      });
      map.fitBounds(bounds);
    }
  }, [map, markers]);

  const mapOptions = {
    disableDefaultUI: true,
    zoomControl: true,
    styles: isDark ? darkMapStyles : [], // Use custom dark mode styles if in dark mode
  };

  if (loadError) {
    return (
      <div className="flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 rounded-lg text-red-500 font-medium" style={{ height }}>
        Error loading Google Maps
      </div>
    );
  }

  return isLoaded ? (
    <div style={{ height }} className="relative w-full rounded-lg overflow-hidden border border-border shadow-sm">
      {!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY && (
        <div className="absolute top-2 left-2 right-2 z-10 bg-yellow-100 text-yellow-800 text-xs px-3 py-2 rounded-md shadow-md">
          <strong>Notice:</strong> NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is missing. Map is running in development mode.
        </div>
      )}
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={mapOptions}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={{ lat: marker.lat, lng: marker.lng }}
            title={marker.title}
          />
        ))}
      </GoogleMap>
    </div>
  ) : (
    <div className="w-full animate-pulse bg-zinc-200 dark:bg-zinc-800 rounded-lg" style={{ height }} />
  );
}

// Custom Dark Map Styles for Google Maps
const darkMapStyles = [
  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#263c3f" }],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#6b9a76" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#38414e" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#212a37" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9ca5b3" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#746855" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#1f2835" }],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#f3d19c" }],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#2f3948" }],
  },
  {
    featureType: "transit.station",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#17263c" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#515c6d" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#17263c" }],
  },
];
