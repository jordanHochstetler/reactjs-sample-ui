import React from 'react';
import ReactDOM from 'react-dom';
import ReactRouter, {Link, Router, Route, IndexRoute, hashHistory} from 'react-router';
import { Provider } from 'react-redux';

// components
import LogIn from './components/log_in';
import ErrorsContainer from './components/errors/errors_container.jsx';

import { MainViewContainer } from './components/document_view/document_view_container';

// data
import DocumentStore from './data/document_store';

// store
import configureStore from './store/store';

//utils
import NuxeoUtils from './utils/nuxeo_utils';

let redirectConditions = function (nextState, replace) {
  if (!DocumentStore.getUser()) {
    replace("/");
  }
};

const Root = ({ store }) => {
    return (
        <Provider store={store}>
            <ErrorsContainer>
                <Router history={hashHistory}>
                    <Route path="/" component={LogIn}/>
                    <Route path="/documents" component={ MainViewContainer } onEnter={ redirectConditions }/>
                </Router>
            </ErrorsContainer>
        </Provider>
    )
};

document.addEventListener("DOMContentLoaded", () => {
    const store = configureStore();
    const root = document.getElementById('root');
    NuxeoUtils.addStore(store);
    ReactDOM.render(<Root store={store} />, root);
});
