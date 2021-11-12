import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage.jsx'
import Home from './components/Home/Home';
import CreateDog from './components/CreateDog/CreateDog.jsx';
import Details from './components/Details/Details.jsx';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route path='/home/:id' component={Details} />
        <Route exact path='/' component={LandingPage} />
        <Route path='/home' component={Home} />
        <Route path='/dog' component={CreateDog} />
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
