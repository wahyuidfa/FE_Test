import React, { useEffect } from "react";
import { Card } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import {
    Table,
    TableBody,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
    TableCell,
} from "./ui/table";
import PaginationComponent from "./pagination-component";
import { Button } from "./ui/button";
import { Edit, Eye, PlusIcon, Trash2Icon } from "lucide-react";
import {
    DialogClose,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogOverlay,
    DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { z } from "zod";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    ruas: z.string().min(1, "Ruas is required"),
    gerbang: z.string().min(1, "Gerbang is required"),
});

function TableGerbangComponent({ response }) {
    const [formData, setFormData] = useState({ ruas: "", gerbang: "" });
    const { toast } = useToast();
    const router = useRouter();
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState([]);
    console.log("====================================");
    console.log(response);
    console.log("====================================");
    const handleChange = e => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    useEffect(() => {
        setResult(response?.data?.rows?.rows);
    }, [response]);

    const handleSubmit = async type => {
        // e.preventDefault();
        setLoading(true);
        // Validate form data with zod
        const validation = formSchema.safeParse(formData);

        if (!validation.success) {
            const errorMessages = validation.error.format();
            setErrors(errorMessages);
            return;
        }

        setErrors({}); // Clear any previous errors
        setLoading(true);
        if (type === "create") {
            try {
                // Perform axios POST request to save data
                await axios.post("http://localhost:8080/api/gerbangs", {
                    id: formData.gerbang,
                    IdCabang: formData.ruas,
                    NamaGerbang: "Kebumen2",
                    NamaCabang: "Gedebage Cilacap",
                });
                // Handle success response here
                toast({
                    title: "Service Information",
                    description: "Penambahan telah sukses dilakukan",
                });
                router.refresh();
                setLoading(false);

                console.log("Data saved successfully");
            } catch (error) {
                // Handle error response here
                toast({
                    title: "Service Information",
                    description: "Gagal",
                });
                setLoading(false);
                console.error("Error saving data:", error);
            } finally {
                setLoading(false);
            }
        } else {
            try {
                // Perform axios POST request to save data
                await axios.put("http://localhost:8080/api/gerbangs", {
                    id: formData.gerbang,
                    IdCabang: formData.ruas,
                    NamaGerbang: "Kebumen2",
                    NamaCabang: "Gedebage Cilacap",
                });
                // Handle success response here
                toast({
                    title: "Service Information",
                    description: "Perubahan telah berhasil dilakukan",
                });
                router.refresh();
                setLoading(false);

                console.log("Data saved successfully");
            } catch (error) {
                // Handle error response here
                toast({
                    title: "Service Information",
                    description: "Gagal",
                });
                setLoading(false);
                console.error("Error saving data:", error);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleDelete = (ruas, gerbang) => {
        const filteredResult = result.filter((res) => !(res.IdCabang === ruas && res.id === gerbang));

        // Update state dengan data yang sudah terfilter
        setResult(filteredResult);
        // console.log(ruas, gerbang);
        // axios.delete("http://localhost:8080/api/gerbangs", {
        //     id: gerbang,
        //     IdCabang: ruas,
        // }).then((res) => {
        //     console.log(res);

        //     toast({
        //         title: "Service Information",
        //         description: "Delete telah berhasil dilakukan",
        //     });
        //     router.forward();
        //     setLoading(false)
        // }).catch((err) => {
        //     console.log(err);
        //     toast({
        //         title: "Service Information",
        //         description: "Gagal",
        //     });
        // })
        // Handle success response here

        console.log("Data saved successfully");
    }

    return (
        <>
            {/* <Card className='my-2'> */}
            <div className='flex justify-end my-2 '>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant='outline'>
                            <PlusIcon className='h-4 w-4 mr-2' /> Tambah
                        </Button>
                    </DialogTrigger>
                    <DialogContent className='sm:max-w-[425px]'>
                        <DialogHeader>
                            <DialogTitle>Tambah Gerbang</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={() => handleSubmit("create")}>
                            <div className='grid gap-4 py-4'>
                                <div className='grid grid-cols-4 items-center gap-4'>
                                    <Label htmlFor='name' className='text-right'>
                                        Ruas*
                                    </Label>
                                    <Input
                                        id='ruas'
                                        placeholder='Pedro Duarte'
                                        className='col-span-3'
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='grid grid-cols-4 items-center gap-4'>
                                    <Label htmlFor='username' className='text-right'>
                                        Gerbang*
                                    </Label>
                                    <Input
                                        id='gerbang'
                                        placeholder='@peduarte'
                                        className='col-span-3'
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <DialogFooter>
                                <DialogClose>
                                    {" "}
                                    <Button variant='outlined'>Batal</Button>
                                </DialogClose>
                                <Button type='submit'>Save changes</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
            {/* </Card> */}
            <Card>
                <ScrollArea className='h-[300px] overflow-y-auto overflow-x-auto p-2  w-full'>
                    <Table className=''>
                        <TableHeader className=''>
                            <TableRow className='w-28 overflow-y-auto  '>
                                <TableHead>No</TableHead>
                                <TableHead className='text-center'>Ruas</TableHead>
                                <TableHead className='text-center'>Gerbang</TableHead>
                                <TableHead className='text-center'>Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {result.map((res, id) => (
                                <TableRow>
                                    <TableCell>{id + 1}</TableCell>
                                    <TableCell className='text-center'>{res.IdCabang}</TableCell>
                                    <TableCell className='text-center'>{res.id}</TableCell>
                                    <TableCell className='text-center'>
                                        <div className='  gap-2'>
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button
                                                        variant='outlined'
                                                        className='p-1 h-auto mx-1'>
                                                        <Edit className='h-4 w-4' />
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className='sm:max-w-[425px]'>
                                                    <DialogHeader>
                                                        <DialogTitle>Edit Gerbang</DialogTitle>
                                                    </DialogHeader>
                                                    <form onSubmit={() => handleSubmit("twst")}>
                                                        <div className='grid gap-4 py-4'>
                                                            <div className='grid grid-cols-4 items-center gap-4'>
                                                                <Label htmlFor='name' className='text-right'>
                                                                    Ruas*
                                                                </Label>
                                                                <Input
                                                                    id='ruas'
                                                                    defaultValue={res.IdCabang}
                                                                    className='col-span-3'
                                                                />
                                                            </div>
                                                            <div className='grid grid-cols-4 items-center gap-4'>
                                                                <Label
                                                                    htmlFor='username'
                                                                    className='text-right'>
                                                                    Gerbang*
                                                                </Label>
                                                                <Input
                                                                    id='gerbang'
                                                                    className='col-span-3'
                                                                    defaultValue={res.id}
                                                                />
                                                            </div>
                                                        </div>
                                                        <DialogFooter>
                                                            <DialogClose>
                                                                {" "}
                                                                <Button variant='outlined'>Batal</Button>
                                                            </DialogClose>
                                                            <Button type='submit'>Save changes</Button>
                                                        </DialogFooter>
                                                    </form>
                                                </DialogContent>
                                            </Dialog>

                                            <Button variant='outlined' className='p-1 h-auto mx-1'>
                                                <Eye className='h-4 w-4' />
                                            </Button>
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button variant='outlined' className='p-1 h-auto mx-1'>
                                                        <Trash2Icon className='h-4 w-4' />
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className='sm:max-w-[425px]'>
                                                    <DialogHeader>
                                                        <DialogTitle>Hapus Gerbang</DialogTitle>
                                                    </DialogHeader>
                                                    <div>
                                                        Apakah anda yakin ingin menhapus ruas {res.IdCabang}{" "}
                                                        dan {res.id} ?
                                                    </div>
                                                    <DialogFooter>
                                                        <DialogClose>
                                                            {" "}
                                                            <Button variant='outlined'>Batal</Button>
                                                        </DialogClose>
                                                        <DialogClose>
                                                            <Button onClick={() => handleDelete(res.IdCabang, res.id)}>Ya</Button>
                                                        </DialogClose>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </ScrollArea>
            </Card>
            <PaginationComponent totalPages={response.data.total_pages} />
        </>
    );
}

export default TableGerbangComponent;
