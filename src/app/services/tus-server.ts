import { Server, MemoryKvStore } from '@tus/server';
import { FileStore } from '@tus/file-store';
import path from 'path';


const store = new FileStore({
    directory: path.join(__dirname, 'files'),
  });
  
  const tusServer = new Server({
    path: '/files',  // Set the path here in the Server configuration
    datastore: store,
  });

  export {tusServer};