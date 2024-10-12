import { registerRootComponent } from "expo";
import Main from "./src/components/Main";
registerRootComponent(Main);
export default function App() {
  return <Main />;
}
