interface CardProps {
    title?: string
    child?: any
    class?: string
    height: string
    width: string
}

export default function(props: CardProps) {

    return (
        <div className={`${props.height} ${props.width} ${props.class ? props.class : ''}`}>
            if(props.title) {
                <div>
                    <h1>{props.title}</h1>
                </div>
            }
            <div>
                {props.child}
            </div>
        </div>
    )
}