import {createGlobalStyle} from "styled-components";

const GlobalStyle = createGlobalStyle`
html{
  background: white;
}

body {
  margin: 0 0 0 0;
}

h1 {
  letter-spacing: 0.25rem;
}

h1, p {
  margin: 0;
  padding: 0;
}

button {
  font-size: large;
  margin-right: 1em;
}

body, input, textarea, button  {
  font-family:"Encode Sans",Roboto,monospace;
}

/* width */
::-webkit-scrollbar {
  border-top-right-radius: 10px;
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
`;

export default GlobalStyle;