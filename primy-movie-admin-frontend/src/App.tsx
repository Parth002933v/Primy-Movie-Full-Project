// layout
import SideMenu from "./seaction/SideMenu";
import MainContent from "./seaction/MainContentOutlet";

// shadcn theme

// react query fro manage api
import { QueryClient, QueryClientProvider } from "react-query";

import { useEffect } from "react";
import TabLightThemeIcon from "../public/logo/tab_logo_light_theme.png";
import tab_dark_theme_icon from "../public/logo/tab_logo_dark_theme.png";

const queryClient = new QueryClient();

function App() {
  // used to change favicon based on browser
  useEffect(() => {
    const favicon: HTMLLinkElement | null =
      document.querySelector("link[rel='icon']");

    // Function to detect browser theme preference
    const detectTheme = () => {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        // Dark theme is preferred
        if (favicon) {
          favicon.href = tab_dark_theme_icon;
        }
      } else {
        // Light theme is preferred
        if (favicon) {
          favicon.href = TabLightThemeIcon;
        }
      }
    };

    // Call detectTheme function initially
    detectTheme();

    // Add event listener for theme changes
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", detectTheme);

    // Clean up on unmount
    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", detectTheme);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
        <div className="flex bg-muted  w-screen h-screen p-4">
          <SideMenu />
          <MainContent />
        </div>
    </QueryClientProvider>
  );
}

export default App;
