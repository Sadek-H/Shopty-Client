import React, { Children, createContext, useState } from 'react';
export const Globalsearchcontext = createContext()
const Globalsearchprovider = ({children}) => {
    const [query,setQuery] = useState("");
    console.log(query);
    return (
        <div>
           <Globalsearchcontext.Provider value={{ query, setQuery }}>
               {children}
           </Globalsearchcontext.Provider>
        </div>
    );
};

export default Globalsearchprovider;