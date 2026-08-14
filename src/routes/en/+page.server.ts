import { getResume } from '$lib/resume/app.ts';

export const load = () => ({ resume: getResume('en') });
