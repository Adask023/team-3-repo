/*eslint-disable*/
import React from "react";

export const PageNotFound = () => {
  const p = {
    margin: "0",
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "4rem",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "4rem",
          borderBottom: "2px solid #E7E5E5",
        }}
      >
        <p style={{ fontSize: "1.4rem", margin: "0", fontStyle: "italic" }}>
          Z matki obcej: <br />
          krew jego dawne bohatery,
          <br />a imię jego będzie
        </p>
        <p style={{ fontSize: "6rem", paddingLeft: "2rem", margin: "1rem 0" }}>
          40
          <span
            style={{
              fontSize: "2rem",
              padding: "0 .3rem 0 .1rem",
            }}
          >
            i
          </span>
          4
        </p>
      </div>
      <div
        style={{
          textAlign: "right",
          color: "#1976d2",
          margin: "0",
          width: "100%",
        }}
      >
        <p style={{ p }}>
          Nie przejmuj się, nawet Mickiewiczowi zdarzało się pogubić.
          <br />
          Jesteś pewien, że wybrałeś właściwy adres?
          <br />
          Spróbuj jeszcze raz :)
        </p>
      </div>
    </div>
  );
};
