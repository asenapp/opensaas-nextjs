import { FreestyleSandboxes } from "freestyle-sandboxes";
import { prepareDirForDeploymentSync } from "freestyle-sandboxes/utils";

// Create a sandboxes client
const sandboxes = new FreestyleSandboxes({
    apiKey: "JXQQEvxH8TSuQqBoXCbjah-HbptNy9qQ4mqN6cnSVd3c8de7wn7HzEs1DEQXuX6ovA1",
});

async function deploy() {
    try {
        console.log("🚀 Starting deployment...");
        console.log("📁 Preparing directory for deployment...");

        const deploymentDir = prepareDirForDeploymentSync(".");
        console.log("✅ Directory prepared successfully");

        console.log("🌐 Deploying to Freestyle Sandboxes...");
        const result = await sandboxes.deployWeb(deploymentDir, {
            domains: ["example.style.dev"],
            build: true,
        });

        console.log("🎉 Deployment successful!");
        console.log("Result:", result);

    } catch (error) {
        console.error("❌ Deployment failed:");
        console.error("Error:", error.message);

        if (error.cause) {
            console.error("Cause:", error.cause);
        }

        // Check if it's a network error
        if (error.code === 'ECONNRESET' || error.code === 'ENOTFOUND' || error.code === 'ETIMEDOUT') {
            console.log("\n🔧 Network error detected. Please check:");
            console.log("1. Your internet connection");
            console.log("2. If you're behind a firewall/proxy");
            console.log("3. Try again in a few minutes");
        }

        process.exit(1);
    }
}

// Add a timeout to prevent hanging
const timeout = setTimeout(() => {
    console.error("⏰ Deployment timed out after 5 minutes");
    process.exit(1);
}, 5 * 60 * 1000);

deploy().finally(() => {
    clearTimeout(timeout);
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