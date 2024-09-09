import { createConsumer } from '@rails/actioncable';

const url = process.env.RAILS_CABLE || 'ws://localhost:3001/cable';
const cable = createConsumer(url);

export default cable;
