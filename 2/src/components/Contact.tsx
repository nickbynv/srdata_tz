import { IContact } from "../interfaces"

export default function Contact(props: {
    contact: IContact
}) {
    return (
        <div className="flex flex-col bg-gray-100 border border-gray-200 p-5 px-6 rounded-xl mt-2 first:mt-0">
            <h1 className="font-medium text-2xl">
                {props.contact.title}
            </h1>

            <h3 className="font-medium text-xl text-[#138550]">
                {props.contact.phone}
            </h3>

            <p className="mt-3">
                {props.contact.description}
            </p>

            <span className="font-medium mt-5 text-[#1e366b]">
                Created: {props.contact.created}
            </span>
        </div>
    )
}