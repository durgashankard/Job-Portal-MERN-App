import { Link } from "react-router-dom"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Button } from "../ui/button"
import { Avatar, AvatarImage } from "../ui/avatar"
import { LogOut, User2 } from "lucide-react"

function Navbar() {
    const User = false;
    return (
        <div className="bg-white">
            <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
                <div className="">
                    <h1 className="text-2xl font-bold">Job <span className="text-red-500">Portal</span></h1>
                </div>
                <div className="flex items-center gap-12">
                    <ul className="flex font-medium items-center gap-5">
                        <li><Link>Home</Link></li>
                        <li><Link>Jobs</Link></li>
                        <li><Link>Browse</Link></li>
                    </ul>

                    {
                        !User ? (
                            <div className="flex items-center gap-3">
                                <Link to="/login">
                                    <Button variant="outline">Login</Button>
                                </Link>
                                <Link to="/signup">
                                    <Button className="bg-blue-400 hover:bg-blue-600">SignUp</Button>
                                </Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger >
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage
                                            src="https://github.com/shadcn.png"
                                            alt="@shadcn"
                                            className="grayscale"
                                        />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                    <div className=" flex gap-4 space-y-2 items-center ">
                                        <Avatar className="cursor-pointer">
                                            <AvatarImage
                                                src="https://github.com/shadcn.png"
                                                alt="@shadcn"
                                                className="grayscale"
                                            />
                                        </Avatar>
                                        <div>
                                            <h4 className=" font-medium">Durgesh dev</h4>
                                            <p className="text-sm text-muted-foreground">Lorem ipsum dolor sit amet. lorem</p>
                                        </div>
                                    </div>

                                    <div className=" flex flex-col my-2 text-gray-500">
                                        <div className=" flex w-fit items-center gap-2">
                                            <User2 />
                                            <Button variant="link" className="cursor-pointer">View Profile</Button>
                                        </div>
                                        < div className=" flex w-fit items-center gap-2 ">
                                            <LogOut />
                                            <Button variant="link" className="cursor-pointer">Logout</Button>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }



                </div>
            </div>
        </div >
    )
}

export default Navbar