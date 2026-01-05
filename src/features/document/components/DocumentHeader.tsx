import { MdIceSkating } from "react-icons/md"

export const DocumentHeader = () => {
    return (
        <>
            <div className="w-full h-[20vh] bg-gradient-to-br from-indigo-400/80 via-purple-400/60 to-pink-400/80" />
            <div className="mx-auto max-w-5xl p-8">
                <div className="flex flex-col mb-8 group relative">
                    <div className="flex items-center mb-4">
                        <div className={`w-16 h-16 rounded`}>
                            <MdIceSkating />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold text-text-light-primary dark:text-text-dark-primary mb-1">
                                {"workspace.title"}
                            </h1>
                            <div className="flex items-center text-xs text-text-light-secondary dark:text-text-dark-secondary space-x-3">
                                <span className="flex items-center gap-1">
                                    {/* {workspace.type === "Private" ? <MdLock /> : <MdLockOpen />} */}
                                    {"workspace.type"}
                                </span>
                                <span>•</span>
                                <span>{"workspace.lastEdited"}</span>
                            </div>
                        </div>
                    </div>
                    <p className="text-text-light-primary dark:text-text-dark-primary border-l-2 border-border-light dark:border-border-dark pl-4 italic text-lg opacity-80">
                        {"workspace.description"}
                    </p>
                </div>
            </div>
        </>
    )
}