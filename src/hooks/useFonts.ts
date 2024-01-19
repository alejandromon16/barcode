import { useEffect, useState } from 'react';
import * as Font from 'expo-font';

const useFontLoader = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const fontMap = {
    'GT Walsheim Pro-regular': require('../../src/assets/fonts/GTWalsheimPro-Regular.ttf'),
    'GT Walsheim Pro-bold': require('../../src/assets/fonts/GTWalsheimPro-Bold.ttf'),
    'GT Walsheim Pro-medium': require('../../src/assets/fonts/GTWalsheimPro-Medium.ttf'),
    'GT Walsheim Pro-thin': require('../../src/assets/fonts/GTWalsheimPro-Thin.ttf'),
    'GT Walsheim Pro-light': require('../../src/assets/fonts/GTWalsheimPro-Light.ttf'),
  };

  const loadFonts = async () => {
    await Font.loadAsync(fontMap);
    setFontsLoaded(true);
  };

  useEffect(() => {
    loadFonts();
  }, []);

  return fontsLoaded;
};

export default useFontLoader;
