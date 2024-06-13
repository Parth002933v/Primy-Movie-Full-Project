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

import Select from 'react-select';



import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea"

import { useEffect } from "react"

import { convertToSlugUrl } from "@/utils/utils"

import MyCard from "../custom-card"
import { globalFetcher2 } from "@/utils/fetcher"
import { filterData } from "@/types/other-types"
import { ApolloQueryResult, gql } from "@apollo/client"
import { selectStyles } from "./custom-style"
import { Checkbox } from "../ui/checkbox"

const currentYear = new Date().getFullYear();
const minYear = currentYear - 50;

const formSchema = z.object({
    movieName: z.string().min(2, { message: "Movie Name should be min 2 character long" }),
    content: z.string().min(10, { message: "Movie content should be atleast 10 charcter long" }),
    slugUrl: z.string(),
    posterImage: z.string().url({ message: "Please provide valid url" }),
    bannerImage: z.string().url({ message: "Please provide valid url" }),
    screenShorts: z.array(z.object({ link: z.string().url('Must be a valid URL').nonempty('URL is required') })).min(1, "Provide minimum one screenShort"),
    downloadLink: z.array(z.object({ text: z.string().min(1), link: z.string().url("Must be a valid URL") })).min(1, "provide mimimum one download link"),
    releaseYear: z.preprocess((val) => {
        if (typeof val === 'string') { return Number(val) }
        return val;
    }, z.number().int().min(minYear, `Year must be no earlier than ${minYear}`).max(currentYear, `Year must be no later than ${currentYear}`)),
    genere: z.array(z.object({ value: z.string(), label: z.string() })).min(1, "provide atleast one genere"),
    language: z.array(z.object({ value: z.string(), label: z.string() })).min(1, "provide atleast one language"),
    isSeries: z.boolean().default(false).optional(),
    isDualAudio: z.boolean().default(false).optional(),
    seasons: z.array(z.object({ link: z.string().nonempty('URL is required') })).min(1, "Provide minimum one screenShort"),
})

export default function AddMoviePage({ filterData }: { filterData: ApolloQueryResult<filterData> }) {



    //* 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            movieName: "",
            content: "",
            slugUrl: "",
            posterImage: "",
            bannerImage: "",
            screenShorts: [{ link: "" }],
            downloadLink: [{ link: "", text: "" }],
            genere: [],
            language: [],
            seasons: []

        },
    })


    const screenShortUseFieldArray = useFieldArray({ control: form.control, name: "screenShorts", keyName: "id" });
    const downloadLinkUseFieldArray = useFieldArray({ control: form.control, name: "downloadLink", keyName: "id" });



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

                    {/* screenShort */}
                    <MyCard className="max-h-60 overflow-auto no-scrollbar  border-muted">
                        <div className="flex w-full">
                            <div key={"screenShortsInner"} className="flex-auto ">
                                <FormLabel>screenShorts</FormLabel>
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
                                            )}
                                        />
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

                    {/* downloadLinks    */}
                    <MyCard className="max-h-60 overflow-auto no-scrollbar border-muted">
                        <div className="flex w-full">
                            <div key={"screenShortsInner"} className="flex-auto ">
                                <FormLabel >downloadLinks</FormLabel>

                                {downloadLinkUseFieldArray.fields.map((f, i) => (
                                    <div key={f.id} className="flex gap-2 mb-1 ">
                                        <FormField
                                            control={form.control}
                                            name={`downloadLink.${i}.text` as const}
                                            render={({ field }) => (
                                                <>
                                                    <FormControl >
                                                        <Input  {...field} placeholder={`1080p Full HD Bluray`} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </>

                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name={`downloadLink.${i}.link` as const}
                                            render={({ field }) => (
                                                <>
                                                    <FormControl >
                                                        <Input {...field} required placeholder={`https://example.com/screenshot ${i + 1}.jpg`} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </>

                                            )}
                                        />

                                        {i > 0 && (
                                            <Button
                                                type="button"
                                                variant={"destructive"}
                                                onClick={() => downloadLinkUseFieldArray.remove(i)}
                                                className="h-8 w-8 items-center rounded-[4px] ">
                                                -
                                            </Button>
                                        )}
                                    </div>

                                )
                                )}

                            </div>

                            <Button type="button" onClick={() => downloadLinkUseFieldArray.append({ link: "", text: "" })} className="mt-6 h-8 w-8 rounded-[4px]" children="+" />

                        </div>
                    </MyCard>


                    {/* Release year */}
                    <FormField
                        control={form.control}
                        name="releaseYear"
                        render={({ field }) => (
                            <div>
                                <FormLabel>Release year</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        className="rounded-[5px]"
                                        placeholder="2024"
                                        {...field}
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                    />
                                </FormControl>
                                <FormMessage />
                            </div>
                        )}
                    />

                    {/* generes */}
                    <div>
                        <FormField
                            control={form.control}
                            name="genere"
                            render={({ field }) => (
                                <>
                                    <FormLabel htmlFor="genres">Genres</FormLabel>

                                    <FormControl>
                                        <Select
                                            isMulti
                                            {...field}
                                            className="w-full text-black"
                                            options={filterData.data.generes.map((m, i) => { return { label: m.name, value: m._id } })}
                                            styles={selectStyles(true)}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </>
                            )}
                        />


                    </div>

                    {/* isSeries isDualAudio*/}
                    <MyCard className=" border-muted  m-0 p-0  ">
                        <FormField
                            control={form.control}
                            name="isSeries"
                            render={(field) => (<>

                                <Checkbox
                                    className="rounded-[3px] mx-4 mt-[5%] "
                                    {...field}
                                />
                                <FormLabel children="isSeries" />

                            </>)}
                        />

                        <FormField
                            control={form.control}
                            name="isDualAudio"
                            render={(field) => (<>
                                <Checkbox
                                    className="rounded-[3px] mx-4 mt-[5%] "
                                    {...field}
                                />
                                <FormLabel children="isDualAudio" />

                            </>)}
                        />


                    </MyCard>


                    {/* Languages */}
                    <div>
                        <FormField
                            control={form.control}
                            name="language"
                            render={({ field }) => (
                                <>
                                    <FormLabel >Languages</FormLabel>
                                    <FormControl>
                                        <Select
                                            isMulti
                                            {...field}
                                            className="w-full text-black"
                                            options={filterData.data.languages.map((m, i) => { return { label: m.languageName, value: m._id } })}
                                            styles={selectStyles(true)}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </>
                            )}
                        />


                    </div>


                    {/* screenShort */}
                    {/* <MyCard className="max-h-60 overflow-auto no-scrollbar  border-muted">
                        <div className="flex w-full">
                            <div key={"screenShortsInner"} className="flex-auto ">
                                <FormLabel>screenShorts</FormLabel>
                                {screenShortUseFieldArray.fields.map((f, i) => {
                                    return (
                                        <FormField
                                            key={f.id}
                                            control={form.control}
                                            name={`seasons.${i}.link` as const}
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
                                            )}
                                        />
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
                    </MyCard> */}


                </div>
                <Button type="submit">Submit</Button>
            </form>
        </Form >
    )
}
