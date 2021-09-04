import { Spin } from 'antd'

export const Loading = (props: any) => {
    const className = props.className ? props.className : ""
    const style = props.style ? props.style : null
    let loadingStyle = { color: "#e99667" }
    loadingStyle = { ...loadingStyle, ...style }
    return (
        <Spin style={loadingStyle} className={className} />
    )
}