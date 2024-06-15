import { z } from "zod";



const currentYear = new Date().getFullYear();
const minYear = currentYear - 50;
export const formSchema = z.object({
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

    isSeries: z.boolean().optional().default(false),
    isDualAudio: z.boolean().optional().default(false),

    seasons: z.array(z.object({ id: z.string() })).optional().default([]),
    category: z.object({ value: z.string(), label: z.string() }),
    videoQuality: z.array(z.object({ label: z.string(), value: z.string() })),
    movieProvider: z.object({ value: z.string(), label: z.string() }),
    ageRating: z.object({ value: z.string(), label: z.string() }),
    tag: z.preprocess((val: string | unknown) => {
        if (typeof val === "string") { return String(val).split(",") }
    }, z.array(z.string()))


})