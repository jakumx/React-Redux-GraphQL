import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom'
import 'font-awesome/css/font-awesome.css'
import { Provider } from 'react-redux'
import generateStore from './redux/store'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

const store = generateStore()

const client = new ApolloClient({
    uri: 'https://rickandmortyapi.com/graphql'
})

const WithRouter = () => <BrowserRouter><App /></BrowserRouter>
const WithStore = () => <Provider store={store}><WithRouter/></Provider>
const WithApollo = () => <ApolloProvider client={client}><WithStore /></ApolloProvider>

ReactDOM.render(<WithApollo />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
