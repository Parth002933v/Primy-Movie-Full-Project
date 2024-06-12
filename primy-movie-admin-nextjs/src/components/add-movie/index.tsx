"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray, Controller } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea"
import { useEffect } from "react"
import { convertToSlugUrl } from "@/utils/utils"
import MyCard from "../custom-card"


const formSchema = z.object({
    movieName: z.string().min(2, { message: "Movie Name should be min 2 character long" }),
    content: z.string().min(10, { message: "Movie content should be atleast 10 charcter long" }),
    slugUrl: z.string(),
    posterImage: z.string().url({ message: "Please provide valid url" }),
    bannerImage: z.string().url({ message: "Please provide valid url" }),
    screenShorts: z.array(z.object({ link: z.string().url('Must be a valid URL').nonempty('URL is required') }))
})

export default function AddMoviePage() {
    //* 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            content: "",
            slugUrl: "",
            posterImage: "",
            bannerImage: "",
            screenShorts: [{ link: "" }] // Initialize with one field
        },
    })


    const screenShortUseFieldArray = useFieldArray({ control: form.control, name: "screenShorts", keyName: "id" });

    //* 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    useEffect(() => {
        if (form.watch("movieName")) {
            const slugUrl = convertToSlugUrl({ str: String(form.watch("movieName")) });
            form.setValue("slugUrl", slugUrl)
        }
        else {
            form.setValue("slugUrl", "")
        }


    }, [form.watch("movieName")])

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className=" w-full  grid grid-cols-2 gap-2">

                    {/* movie Name */}
                    <FormField
                        control={form.control}
                        name="movieName"
                        render={({ field }) => (
                            <div>
                                <FormLabel>Movie Name</FormLabel>
                                <FormControl>
                                    <Textarea
                                        className="rounded-[5px]"
                                        id="movieName"
                                        placeholder="Movie Name"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="" />
                            </div>
                        )}
                    />

                    {/* movie content */}
                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <div>
                                <FormLabel>Content</FormLabel>
                                <FormControl>
                                    <Textarea
                                        className="rounded-[5px]"
                                        placeholder="About the movie"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="" />
                            </div>
                        )}
                    />


                    {/* slugurl */}
                    <FormField
                        control={form.control}
                        name="slugUrl"
                        render={({ field }) => (
                            <div>
                                <FormLabel>SlugUrl</FormLabel>
                                <FormControl>
                                    <Input
                                        readOnly
                                        className="rounded-[5px]"
                                        placeholder="About the movie"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </div>
                        )}
                    />


                    {/* posterImage */}
                    <FormField
                        control={form.control}
                        name="posterImage"
                        render={({ field }) => (
                            <div>
                                <FormLabel>Poster Image</FormLabel>
                                <FormControl>
                                    <Input
                                        className="rounded-[5px]"
                                        placeholder="https://example.com/poster.jpg"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="" />
                            </div>
                        )}
                    />


                    {/* banner Image */}
                    <FormField
                        control={form.control}
                        name="bannerImage"
                        render={({ field }) => (
                            <div>
                                <FormLabel>Banner Image</FormLabel>
                                <FormControl>
                                    <Input
                                        className="rounded-[5px]"
                                        placeholder="https://example.com/banner.jpg"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </div>
                        )}
                    />

                    <MyCard className="max-h-60 overflow-auto no-scrollbar  border-muted">
                        <div className="flex w-full">
                            <div key={"screenShortsInner"} className="flex-auto ">
                                <FormLabel>Banner Image</FormLabel>
                                {screenShortUseFieldArray.fields.map((f, i) => {
                                    return (
                                        <FormField
                                            key={f.id}
                                            control={form.control}
                                            name={`screenShorts.${i}.link` as const}
                                            render={({ field }) => (
                                                <div key={f.link} className="flex gap-2 mb-1 ">

                                                    <FormControl >
                                                        <Input {...field} required placeholder={`https://example.com/screenshot ${i + 1}.jpg`} />
                                                    </FormControl>

                                                    {i > 0 && (
                                                        <Button
                                                            type="button"
                                                            key={f.link}
                                                            variant={"destructive"}
                                                            onClick={() => screenShortUseFieldArray.remove(i)}
                                                            className="h-8 w-8 items-center rounded-[4px] ">
                                                            -
                                                        </Button>
                                                    )}

                                                </div>
                                            )} />
                                    )
                                })}

                            </div>

                            <Button
                                type="button"
                                onClick={() => screenShortUseFieldArray.append({ link: "" })}
                                className="mt-6 h-8 w-8 rounded-[4px] "
                            >
                                +
                            </Button>
                        </div>
                    </MyCard>


                </div>
                <Button type="submit">Submit</Button>
            </form>
        </Form >
    )
}
