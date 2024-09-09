import { createConsumer } from '@rails/actioncable';

const url = process.env.RAILS_CABLE || 'wss://api.qa-challenge.dan1d.dev/cable';
const cable = createConsumer(url);

export default cable;
