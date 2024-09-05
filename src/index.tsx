import App from "@/components/App"
import {createRoot} from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import { setupStore } from "./store"
import { Provider } from "react-redux"

const store = setupStore()

const root = document.getElementById('root')

if (!root) {
    root.innerHTML = 'Hello, World!'
}

const container = createRoot(root)

container.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>    
)

