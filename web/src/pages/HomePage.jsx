import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Fuse from 'fuse.js';
import Layout from '../components/layout/Layout';
import ProjectCard from '../components/project/ProjectCard';
import SearchAndFilter from '../components/ui/SearchAndFilter';
import Loading from '../components/ui/Loading';
import Card from '../components/ui/Card';
import { Github, Sparkles } from 'lucide-react';

const HomePage = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [sortMethod, setSortMethod] = useState('default');

  // Load JSON data
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await fetch('/projects.json');
        const data = await response.json();
        setProjects(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading projects:', error);
        setIsLoading(false);
      }
    };

    loadProjects();
  }, []);

  // Calculate tag frequencies
  const tagFrequency = useMemo(() => {
    const frequencies = {};
    projects.forEach(project => {
      const projectTags = [
        ...(project.topics || []),
        ...(project.ai_tag?.tags || []),
        project.language
      ].filter(Boolean);

      projectTags.forEach(tag => {
        frequencies[tag] = (frequencies[tag] || 0) + 1;
      });
    });
    return frequencies;
  }, [projects]);

  // Fuzzy search setup
  const fuse = useMemo(() => {
    const options = {
      keys: ['full_name', 'name', 'description', 'ai_tag.tags', 'topics', 'language'],
      threshold: 0.3,
      includeScore: true,
    };
    return new Fuse(projects, options);
  }, [projects]);

  // Filtered and sorted projects
  const filteredProjects = useMemo(() => {
    let result = projects;

    // Apply fuzzy search if there's a search term
    if (searchTerm.trim()) {
      result = fuse.search(searchTerm.trim()).map(r => r.item);
    }

    // Apply tag filtering
    if (selectedTags.length > 0) {
      result = result.filter(project => {
        const projectTags = [
          ...(project.topics || []),
          ...(project.ai_tag?.tags || []),
          project.language
        ].filter(Boolean);

        return selectedTags.every(tag => projectTags.includes(tag));
      });
    }

    // Apply sorting
    if (sortMethod === 'stars') {
      result = [...result].sort((a, b) =>
        (b.stargazers_count || 0) - (a.stargazers_count || 0)
      );
    } else if (sortMethod === 'updated-time') {
      result = [...result].sort((a, b) =>
        new Date(b.updated_at) - new Date(a.updated_at)
      );
    }

    return result;
  }, [projects, searchTerm, selectedTags, sortMethod, fuse]);

  // Loading state
  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Loading size="large" text="正在加载项目数据..." />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* GitHub Star Button - Fixed Position */}
      <motion.a
        href="https://github.com/Mran/githubstartog"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="fixed top-20 right-6 z-40 flex items-center space-x-2 bg-gray-900 text-white px-4 py-2.5 rounded-notion-lg shadow-notion-hover hover:shadow-notion-strong transition-all duration-300 group"
      >
        <Github className="w-5 h-5" />
        <span className="text-sm font-medium">Star on GitHub</span>
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-2 h-2 bg-yellow-400 rounded-full"
        />
      </motion.a>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 px-4 sm:px-0"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center space-x-2 bg-notion-blue/10 text-notion-blue px-4 py-2 rounded-notion-full mb-6"
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Curated Project Collection</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold notion-text-primary mb-6 leading-tight"
          >
            My GitHub
            <br />
            <span className="text-notion-blue">Project Showcase</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl notion-text-secondary max-w-3xl mx-auto leading-relaxed"
          >
            A carefully curated collection of my development projects, showcasing innovation,
            <br className="hidden md:block" />
            craftsmanship, and attention to detail in every line of code.
          </motion.p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-6 sm:mb-8 px-4 sm:px-0"
        >
          <SearchAndFilter
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedTags={selectedTags}
            onTagsChange={setSelectedTags}
            sortMethod={sortMethod}
            onSortChange={setSortMethod}
            tagFrequency={tagFrequency}
            totalProjects={projects.length}
            filteredCount={filteredProjects.length}
          />
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.full_name || project.name}
                  project={project}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-notion-gray-100 rounded-notion-full flex items-center justify-center mx-auto mb-6">
                <Github className="w-12 h-12 text-notion-gray-400" />
              </div>
              <h3 className="text-xl font-semibold notion-text-primary mb-2">
                No projects found
              </h3>
              <p className="notion-text-secondary mb-6">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSearchTerm('');
                  setSelectedTags([]);
                  setSortMethod('default');
                }}
                className="bg-notion-blue text-white px-6 py-3 rounded-notion-md font-medium hover:bg-notion-blue/90 transition-colors duration-200"
              >
                Clear all filters
              </motion.button>
            </motion.div>
          )}
        </motion.div>

        {/* Stats Section */}
        {filteredProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-16 text-center"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto px-4 sm:px-0">
              <Card className="text-center">
                <motion.div 
                  className="text-3xl font-bold text-notion-blue"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
                >
                  {projects.length}
                </motion.div>
                <div className="text-sm notion-text-secondary font-medium">
                  Total Projects
                </div>
              </Card>
              <Card className="text-center">
                <motion.div 
                  className="text-3xl font-bold text-notion-blue"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                >
                  {Object.keys(tagFrequency).length}
                </motion.div>
                <div className="text-sm notion-text-secondary font-medium">
                  Technologies
                </div>
              </Card>
              <Card className="text-center">
                <motion.div 
                  className="text-3xl font-bold text-notion-blue"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
                >
                  {projects.reduce((sum, p) => sum + (p.stargazers_count || 0), 0)}
                </motion.div>
                <div className="text-sm notion-text-secondary font-medium">
                  Total Stars
                </div>
              </Card>
            </div>
          </motion.div>
        )}
      </div>
    </Layout>
  );
};

export default HomePage;