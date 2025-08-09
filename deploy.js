import { FreestyleSandboxes } from "freestyle-sandboxes";

const api = new FreestyleSandboxes({ apiKey: "JXQQEvxH8TSuQqBoXCbjah-HbptNy9qQ4mqN6cnSVd3c8de7wn7HzEs1DEQXuX6ovA1" });


api
    .deployWeb(
        {
            kind: "git",
            url: "https://github.com/asenapp/opensaas-nextjs.git", // URL of the repository you want to deploy
        },
        {
            domains: ["main-2.style.dev"],
            build: true, // automatically detects the framework and builds the code
        }
    )
    .then((result) => {
        console.log("Deployed website @ ", result.domains);
    });


// const freestyle = new FreestyleSandboxes();

// const { repoId } = await freestyle.createGitRepository({
//     name: "Test Repository",

//     // This will make it easy for us to clone the repo during testing.
//     // The repo won't be listed on any public registry, but anybody
//     // with the uuid can clone it. You should disable this in production.
//     public: true,

//     source: {
//         url: "https://github.com/asenapp/opensaas-nextjs.git",
//         type: "git",
//     },
// });

// console.log(`Created repo with ID: ${repoId}`);

// const devServer = await freestyle.requestDevServer({ repoId });

// console.log(`Dev Server URL: ${devServer.ephemeralUrl}`);