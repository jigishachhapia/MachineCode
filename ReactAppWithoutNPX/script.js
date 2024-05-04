function App() {
    const [count, setCount] = React.useState(0);
    const increment = () => {
        setCount(prevcount => prevcount+1);
    }
    return <div>
        <p>Count: {count}</p>
        <button onClick={increment}>increment</button>
    </div>

    // return React.createElement("div", 
    // {id: "counter"}, 
    // React.createElement("p",null, `Count: ${count}`),
    // React.createElement("button", {onClick: increment}, `Increment`));  //createElement(elementTag, attributes, children)
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(App));