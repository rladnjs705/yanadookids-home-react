import Image from "next/image";
import axios from 'axios';

export default function CommonLink({ type, src, alt } : {type: string, src: string, alt: string}) {
    async function link(type:string) {

    }

    return (
        <>
            <a onClick={() => link(type)}>
                <Image src={src} alt={alt} width={100} height={100} />
            </a>
        </>
    );
}