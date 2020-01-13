import { createStats } from './Stats';

const stats = createStats();
stats.start();
// execute some operations in browser
const { fps, ms } = stats.finish();
