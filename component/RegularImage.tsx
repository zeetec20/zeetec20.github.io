import Image, {ImageProps} from 'next/image'
import { CSSProperties } from 'react'

const RegularImage = ({layout='fill', objectFit='cover', ...props}: ImageProps & {style?: CSSProperties}) => {
    return (
        <div className='image-next' style={props.style}>
            <Image layout={layout} objectFit={objectFit} {...props} alt={props.alt ?? ''} />
        </div>
    )
}

export default RegularImage