
'use client';

import { Provider } from "react-redux";
import store from "@/store/store";
import SubHeader from "@/components/widgets/Common/SubHeader";
import Footer from "@/components/web/Footer";
import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
console.log('axios.defaults.baseURL',axios.defaults.baseURL);

export default function WebsiteLayout({ children }) {
  return (
    <Provider store={store}>
      <div className="flex flex-col min-h-screen">
        {/* <SubHeader /> */}

        <main className="flex-1">
          {children}
        </main>

        <Footer />
      </div>
    </Provider>
  );
}
