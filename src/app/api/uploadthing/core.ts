import { createUploadthing, type FileRouter } from "uploadthing/next";
// import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

//const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({
    image: {
      maxFileSize: "1MB",
    },
  })
    .onUploadComplete(async ({ file }) => {

      console.log("File uploaded:", file.url);

      // Returning file URL for client-side usage
      return { fileUrl: file.url };
    }),
  categoryImageUploader: f({
    image: {
      maxFileSize: "1MB",
    },
  })
    .onUploadComplete(async ({ file }) => {

      console.log("File uploaded:", file.url);

      // Returning file URL for client-side usage
      return { fileUrl: file.url };
    }),
  bannerImageUploader: f({
    image: {
      maxFileSize: "2MB",
    },
  })
    .onUploadComplete(async ({ file }) => {

      console.log("File uploaded:", file.url);

      // Returning file URL for client-side usage
      return { fileUrl: file.url };
    }),
    marketImageUploader: f({
      image: {
        maxFileSize: "2MB",
      },
    })
      .onUploadComplete(async ({ file }) => {
    
        console.log("File uploaded:", file.url);
    
        // Returning file URL for client-side usage
        return { fileUrl: file.url };
      }),
      productImageUploader: f({
        image: {
          maxFileSize: "4MB", maxFileCount: 5
        },
      })
        .onUploadComplete(async ({ file }) => {
      
          console.log("File uploaded:", file.url);
      
          // Returning file URL for client-side usage
          return { fileUrl: file.url };
        }),
        trainingImageUploader: f({
          image: {
            maxFileSize: "1MB",
          },
        })
          .onUploadComplete(async ({ file }) => {
      
            console.log("File uploaded:", file.url);
      
            // Returning file URL for client-side usage
            return { fileUrl: file.url };
          }),
          farmerImageUploader: f({
            image: {
              maxFileSize: "1MB",
            },
          })
            .onUploadComplete(async ({ file }) => {
        
              console.log("File uploaded:", file.url);
        
              // Returning file URL for client-side usage
              return { fileUrl: file.url };
            }),
          
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

