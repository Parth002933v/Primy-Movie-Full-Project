"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray, Controller } from "react-hook-form"
import { z } from "zod"
import { ApolloQueryResult, gql, DocumentNode } from "@apollo/client";


import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import Select from 'react-select';

import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea"

import { Dispatch, SetStateAction, useEffect, useState } from "react"

import { convertToSlugUrl } from "@/utils/utils"

import MyCard from "../custom-card"
import { filterDataTypes } from "@/types/other-types"
import { selectStyles } from "./custom-style"
import { Checkbox } from "../ui/checkbox"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { formSchema } from "./form-schema";

import { IMovieDetail_gql } from "@/types/movie-types";
import { deleteMovie, handleAuthenticationCheck, serverSubmitForm, updateMovie } from "@/utils/api-calls";

import { useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";




export default function AddMoviePage({ filterData, movieData }: { filterData: ApolloQueryResult<filterDataTypes>, movieData?: IMovieDetail_gql["movieBySlugUrl"] }) {

    const [MessageDialog, setMessageDialog] = useState({ isOpen: false, message: "" })
    const router = useRouter();

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
            videoQuality: [],
            tag: [""],
            isSeries: false,
            isDualAudio: false
        },
    })

    const screenShortUseFieldArray = useFieldArray({ control: form.control, name: "screenShorts", keyName: "id" });
    const downloadLinkUseFieldArray = useFieldArray({ control: form.control, name: "downloadLink", keyName: "id" });
    const seasonUseFieldArray = useFieldArray({ control: form.control, name: "seasons", keyName: "id" });

    async function onSubmit(values: z.infer<typeof formSchema>) {

        const { errors, data } = await serverSubmitForm(values)

        if (errors) {

            return setMessageDialog({ isOpen: true, message: `Error : ${errors[0].message}` })
        }
        if (data) {
            form.reset()
            return setMessageDialog({ isOpen: true, message: `${data.addMovie.message}` })
        }
    }


    async function onUpdate(values: z.infer<typeof formSchema>) {

        const { errors, data } = await updateMovie({ values: values, id: movieData!._id })

        if (errors) {

            return setMessageDialog({ isOpen: true, message: `Error : ${errors[0].message}` })
        }
        if (data) {
            form.reset()
            return setMessageDialog({ isOpen: true, message: `${data.updateMovie.message}` })
        }

    }


    async function onDelete() {
        const res = await deleteMovie({ id: movieData!._id })
        if (res.errors) {
            return setMessageDialog({ isOpen: true, message: `Error : ${res.errors[0].message}` })
        }
        if (res.data) {
            router.replace('/')

            return;
        }
    }


    async function isAuthenticated() {

        const { data, errors } = await handleAuthenticationCheck()
        if (errors) {

            return setMessageDialog({ isOpen: true, message: `Error : ${errors[0].message}` })
        }
        if (data) {
            return setMessageDialog({ isOpen: true, message: `${data.getAdmin}` })
        }

    }

    // movie name to slug 
    useEffect(() => {
        if (form.watch("movieName")) {
            const slugUrl = convertToSlugUrl({ str: String(form.watch("movieName")) });
            form.setValue("slugUrl", slugUrl)
        }
        else {
            form.setValue("slugUrl", "")
        }


    }, [form.watch("movieName")])



    // for update page
    useEffect(() => {
        if (movieData) {
            form.reset({
                movieName: movieData.name,
                content: movieData.content,
                posterImage: movieData.posterImage,
                bannerImage: movieData.bannerImage,
                screenShorts: movieData.screenShorts.map((m) => { return { link: m } }),
                downloadLink: movieData.downloadLink,
                releaseYear: movieData.releaseYear,
                genere: movieData.genre.map((m) => { return { label: m.name, value: m._id } }),
                isDualAudio: movieData.isDualAudio,
                isSeries: movieData.isSeries,
                language: movieData.languages.map((m) => { return { label: m.languageName, value: m._id } }),
                seasons: movieData.Seasons.map((m) => { return { id: m._id } }),
                category: { label: movieData.category.name, value: movieData.category._id },
                videoQuality: movieData.videoQualitys.map((m) => { return { label: `${m.Quality} [${m.Nickname}]`, value: m._id } }),
                movieProvider: { label: movieData.movieProvider.providerName, value: movieData.movieProvider._id },
                ageRating: { label: movieData.ageRating.rating, value: movieData.ageRating._id },
                tag: movieData.tags

            })
        }


    }, [movieData])

    return (
        <>
            <div className="flex justify-between">
                <Button onClick={isAuthenticated}>Check is Authenticated</Button>
                {movieData ? <Button onClick={onDelete} className="bg-destructive">Delete Movie</Button> : <></>}
            </div>
            <Form {...form} >
                <form onSubmit={movieData ? form.handleSubmit(onUpdate) : form.handleSubmit(onSubmit)} className="space-y-8">
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
                                    {screenShortUseFieldArray.fields.map((f, i) => {
                                        return (
                                            <FormField
                                                key={f.id}
                                                control={form.control}
                                                name={`screenShorts.${i}.link` as const}
                                                render={({ field }) => (
                                                    <>
                                                        <FormLabel>screenShorts</FormLabel>
                                                        <div key={f.link} className="flex gap-2 mb-1 ">

                                                            <FormControl >
                                                                <Input {...field} placeholder={`https://example.com/screenshot ${i + 1}.jpg`} />
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
                                                    </>
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
                                                            <Input {...field} placeholder={`https://example.com/screenshot ${i + 1}.jpg`} />
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
                                                instanceId={"genres"}
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
                                render={({ field }) => (
                                    <>
                                        <FormControl>
                                            <Checkbox className="rounded-[3px] mx-4 mt-[5%] " checked={field.value} onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormLabel children="isSeries" />

                                    </>)}
                            />

                            <FormField
                                control={form.control}
                                name="isDualAudio"
                                render={({ field }) => (
                                    <>
                                        <FormControl>
                                            <Checkbox className="rounded-[3px] mx-4 mt-[5%] " checked={field.value} onCheckedChange={field.onChange} />
                                        </FormControl>

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
                                                instanceId={"language"}
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


                        {/* movie Seasons */}
                        <MyCard className="max-h-60 overflow-auto no-scrollbar  border-muted">
                            <div className="flex w-full">
                                <div className="flex-auto ">
                                    <FormLabel>movie Seasons</FormLabel>
                                    {seasonUseFieldArray.fields.map((f, i) => {
                                        return (
                                            <FormField
                                                key={f.id}
                                                control={form.control}
                                                name={`seasons.${i}.id` as const}
                                                render={({ field }) => (
                                                    <div key={f.id} className="flex gap-2 mb-1 ">

                                                        <FormControl >
                                                            <Input {...field} placeholder={`664705f527734b2871ddc4aa`} />
                                                        </FormControl>

                                                        {i > 0 && (
                                                            <Button
                                                                type="button"
                                                                variant={"destructive"}
                                                                onClick={() => seasonUseFieldArray.remove(i)}
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
                                    onClick={() => seasonUseFieldArray.append({ id: "" })}
                                    className="mt-6 h-8 w-8 rounded-[4px] "
                                >
                                    +
                                </Button>
                            </div>
                        </MyCard>


                        {/* category */}
                        <div>
                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <>
                                        <FormLabel >Category</FormLabel>
                                        <FormControl>
                                            <Select
                                                instanceId={"category"}
                                                {...field}
                                                className="w-full text-black"
                                                options={filterData.data.categoris.map((m, i) => { return { label: m.name, value: m._id } })}
                                                styles={selectStyles(true)}

                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </>
                                )}
                            />


                        </div>

                        {/* videoQuality */}
                        <div>
                            <FormField
                                control={form.control}
                                name="videoQuality"
                                render={({ field }) => (
                                    <>
                                        <FormLabel >videoQuality</FormLabel>
                                        <FormControl>
                                            <Select
                                                instanceId={"videoQuality"}

                                                isMulti
                                                {...field}
                                                className="w-full text-black"
                                                options={filterData.data.videoQualitys.map((m, i) => { return { label: `${m.Quality} [${m.Nickname}]`, value: m._id } })}
                                                styles={selectStyles(true)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </>
                                )}
                            />


                        </div>



                        {/* movieProvider */}
                        <div>
                            <FormField
                                control={form.control}
                                name="movieProvider"
                                render={({ field }) => (
                                    <>
                                        <FormLabel> Movie Provider</FormLabel>
                                        <FormControl>
                                            <Select
                                                instanceId={"movieProvider"}
                                                {...field}
                                                className="w-full text-black"
                                                options={filterData.data.providers.map((m, i) => { return { label: m.providerName, value: m._id } })}
                                                styles={selectStyles(true)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </>
                                )}
                            />
                        </div>


                        {/* age rating */}
                        <div>
                            <FormField
                                control={form.control}
                                name="ageRating"
                                render={({ field }) => (
                                    <>
                                        <FormLabel> Age Rating</FormLabel>
                                        <FormControl>
                                            <Select
                                                instanceId={"ageRating"}
                                                {...field}
                                                className="w-full text-black"
                                                options={filterData.data.ageRatings.map((m, i) => { return { label: m.rating, value: m._id } })}
                                                styles={selectStyles(true)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </>
                                )}
                            />
                        </div>


                        {/* tags */}
                        <FormField
                            control={form.control}
                            name="tag"
                            render={({ field }) => (
                                <div>
                                    <FormLabel>Tags</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="rounded-[5px]"
                                            placeholder="Avengers,Action,IronMan,SpiderMan..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </div>
                            )}
                        />


                    </div>


                    <Button type="submit">{movieData ? "Update Movie" : "Submit Movie"}</Button>
                </form>



                <Dialoag messageDialog={MessageDialog} setMessageDialog={setMessageDialog} />

            </Form >

        </>
    )
}




function Dialoag({ messageDialog, setMessageDialog }: {
    messageDialog: {
        isOpen: boolean;
        message: string;
    }, setMessageDialog: Dispatch<SetStateAction<{
        isOpen: boolean;
        message: string;
    }>>
}) {


    return <AlertDialog open={messageDialog.isOpen}>
        <AlertDialogContent>
            <AlertDialogHeader>

                <AlertDialogDescription>
                    {messageDialog.message}
                </AlertDialogDescription>

            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setMessageDialog({ isOpen: false, message: "" })}>Cancel</AlertDialogCancel>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>


}

