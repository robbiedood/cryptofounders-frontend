import { createContext, useState } from "react";

export const OfferContext = createContext({
  showOfferModal: false,
  setShowOfferModal: (i: boolean) => {},
});


export const OfferProvider = ({ children }:any) => {
  const [showOfferModal, setShowOfferModal] = useState(false);

  return (
    <OfferContext.Provider value={{ showOfferModal, setShowOfferModal }}>
      {children}
    </OfferContext.Provider>
  );
};
