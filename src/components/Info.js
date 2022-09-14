const Info = (props) => {
    return (
        <div className="info">
            <div className="speed">{props.speed}</div>
            <div className="engineSpeed">{props.engineSpeed}</div>
            <div className="transmission">{props.transmission}</div>
        </div>
    )
}

export default Info