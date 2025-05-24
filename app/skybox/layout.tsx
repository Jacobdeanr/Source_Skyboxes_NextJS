import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Source Skyboxes - Skybox Details',
  description: 'View detailed information about Source Engine skyboxes',
};

export default function SkyboxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
