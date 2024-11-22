export function blobMapper(blobColor: string) {
    switch (blobColor) {
        case "mint":
            return "bg-mint text-black";
        case "gul":
            return "bg-yellow text-black";
        case "korall":
            return "bg-coral text-white";
        case "blå":
            return "bg-blue text-white";
        case "kalk":
            return "bg-chalk text-black";
        case "vit":
            return "bg-white text-black";
        case "ingen bakgrund":
            return "bg-transparent text-black";
        default:
            return "bg-transparent text-black";
    }
}