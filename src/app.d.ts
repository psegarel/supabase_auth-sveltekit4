// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import { SupabaseClient, Session, type User } from '@supabase/supabase-js';
import type { Database } from './DatabaseDefinitions';
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			supabase: SupabaseClient<Database>;
			getSession(): Promise<Session | null>;
		}
		interface PageData {
			session: Session | null;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export { type Database };
