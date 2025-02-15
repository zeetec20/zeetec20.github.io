import Image, {ImageProps} from 'next/image'
import { CSSProperties } from 'react'

const RegularImage = ({layout='fill', objectFit='cover', ...props}: ImageProps & {style?: CSSProperties}) => {
    const {style, ...propsWithoutStyle} = props
    return (
        <div className='image-next' style={style}>
            <Image layout={layout} objectFit={objectFit} {...propsWithoutStyle} alt={props.alt ?? ''} />
        </div>
    )
}

export default RegularImage