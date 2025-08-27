# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2025-08-27

### Added

- **Dual Module Support**: Added CommonJS build alongside ES modules for better compatibility
- **Generic Type Support**: Enhanced `RequestContext<T>` to accept additional properties
- **Class-based Architecture**: Introduced `RequestContextStorage<T>` class for better flexibility
- **Backward Compatibility**: Maintained existing API while adding new capabilities

### Changed

- **API Refactoring**: `RequestContext` now extends `BaseRequestContext` with generic support
- **Constructor Pattern**: `RequestContextStorage` is now a class that can be instantiated
- **Type Safety**: Improved TypeScript support with better generic type handling
- **Build System**: Dual build process for ES modules and CommonJS

### Fixed

- **Module Compatibility**: Resolved issues with CommonJS projects importing ES modules
- **Type Assertions**: Removed unnecessary type castings in tests
- **API Consistency**: Fixed method signatures for better developer experience

### Technical Details

- Added `tsconfig.cjs.json` for CommonJS builds
- Updated `package.json` exports for dual module support
- Enhanced `ContextStorage.runWithContext()` with overloaded methods
- Improved `createRequestContext()` to handle optional additional fields

## [1.0.2] - 2025-08-26

### Fixed

- **Jest Configuration**: Updated Jest config and reverted to bundler module resolution for test compatibility
- **Test Environment**: Resolved test execution issues with proper module resolution

## [1.0.1] - 2025-08-26

### Fixed

- **ES Module Configuration**: Updated package to use proper ES module configuration with Node16 resolution
- **Module Resolution**: Fixed compatibility issues with modern Node.js versions

### Changed

- **Build Process**: Improved TypeScript compilation and module generation

## [1.0.0] - 2025-08-26

### Added

- **Documentation**: Added comprehensive AsyncLocalStorage guide with wrapper benefits explanation
- **User Guide**: Created didactic explanation of API usage and benefits
- **Official Links**: Added reference to Node.js AsyncLocalStorage documentation

### Changed

- **Documentation Structure**: Organized documentation into multiple markdown files for better readability
- **README Enhancement**: Improved project documentation with comprehensive guides

## [0.2.0] - 2025-08-26

### Added

- **GitHub Actions Workflow**: Manual publish workflow with semver version bumping
- **Automated Publishing**: Version management, git tagging, and NPM publishing automation
- **Release Types**: Support for patch, minor, and major version bumps
- **Git Integration**: Automatic commit and tag creation for releases

### Changed

- **Publishing Process**: Streamlined release workflow with manual triggers
- **Version Management**: Automated version bumping based on release type

## [0.1.0] - 2025-08-26

### Added

- **Package Declaration**: Declared as public package for NPM distribution
- **Package URL**: Fixed package repository and homepage URLs
- **Scope Package**: Changed package name to `@aragaoi/context-storage` scope

### Changed

- **Package Visibility**: Made package publicly accessible on NPM
- **Package Identity**: Established proper package naming and branding

## [0.0.3] - 2025-08-26

### Added

- **Version Badge**: Added version badge to README for current package version
- **Coverage Badge**: Added test coverage badge to README
- **CI/CD**: GitHub Actions workflows for continuous integration and NPM publishing

### Changed

- **Documentation**: Enhanced README with badges and build status information
- **Automation**: Established automated testing and deployment pipeline

## [0.0.2] - 2025-08-26

### Added

- **GitHub Actions**: Comprehensive CI/CD workflows for testing and publishing
- **Jest Configuration**: Complete test setup with coverage reporting
- **TypeScript Configuration**: Proper TypeScript setup with strict type checking

### Fixed

- **TypeScript Issues**: Resolved verbatimModuleSyntax issues with type imports/exports
- **Module Resolution**: Fixed TypeScript compilation and module generation

### Changed

- **Build Process**: Established automated build and test pipeline
- **Code Quality**: Implemented comprehensive testing with 100% coverage

## [0.0.1] - 2025-08-26

### Added

- **Initial Setup**: Complete project foundation with TypeScript and Jest
- **Core Implementation**: AsyncLocalStorage wrapper for context management
- **Type Definitions**: Comprehensive TypeScript types and interfaces
- **Test Framework**: Jest configuration with test coverage reporting

### Features

- **ContextStorage<T>**: Generic context management class
- **RequestContext**: Request-specific context types and utilities
- **RequestContextStorage**: Specialized storage for request contexts
- **Middleware Support**: Integration with Express.js and other frameworks

### Technical Foundation

- **TypeScript**: Full TypeScript support with strict type checking
- **Jest Testing**: Comprehensive test suite with 100% coverage
- **ES Modules**: Modern ES module system with proper exports
- **Node.js Compatibility**: Support for Node.js 16+ with AsyncLocalStorage

## [0.0.0] - 2025-08-26

### Added

- **Project Initialization**: Created new NPM package for context management
- **Repository Setup**: Established Git repository with proper structure
- **Package Configuration**: Initial package.json with basic metadata
- **License**: MIT license for open source distribution

### Features

- **AsyncLocalStorage Wrapper**: Node.js AsyncLocalStorage API wrapper
- **Context Management**: Generic context storage and retrieval
- **Request Isolation**: Request-scoped context management
- **Type Safety**: Full TypeScript support throughout the codebase
