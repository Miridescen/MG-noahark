import { useEffect, useState, useCallback } from "react";

import { loadAppDetails } from "./slices/AppSlice";
import HomeContent from "./homeViews/Home.jsx"

function Home(){
  return (
    <div>
      <HomeContent></HomeContent>
    </div>
  );
}
export default Home;