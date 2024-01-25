import Button from "@shared/Button";
import { useAlertContext } from "@contexts/AlertContext";

function App() {
  const { open } = useAlertContext();
  return (
    <div>
      <Button
        onClick={() => {
          open({ title: "열린다아아", onButtonClick: () => {} });
        }}
      >
        알럿오픈
      </Button>
    </div>
  );
}

export default App;
