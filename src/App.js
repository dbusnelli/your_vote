import VotacionesForm from "./componentes/votaciones/VotacionesForm";
import store from "./redux/store/store";
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
    <div className="container p-4">
      <div className="row">
        <VotacionesForm/>
      </div>
    </div>
    </Provider>
  );
}

export default App;
