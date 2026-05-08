import { fetchProjects } from './src/sanity/queries';
fetchProjects().then(p => console.log(JSON.stringify(p, null, 2))).catch(console.error);
