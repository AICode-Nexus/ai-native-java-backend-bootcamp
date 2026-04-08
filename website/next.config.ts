import path from 'node:path'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  basePath:
    process.env.NODE_ENV === 'production'
      ? '/ai-native-java-backend-bootcamp'
      : '',
  images: {
    unoptimized: true,
  },
  outputFileTracingRoot: path.join(process.cwd(), '..'),
}

export default nextConfig
