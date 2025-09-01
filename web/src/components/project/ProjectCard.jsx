import React from 'react';
import { motion } from 'framer-motion';
import { Star, GitFork, ExternalLink, Calendar, Github } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

const ProjectCard = ({ project, index = 0 }) => {
  // Merge tags from different sources
  const allTags = [
    ...(project.topics || []),
    ...(project.ai_tag?.tags || []),
    project.language
  ].filter(Boolean);

  // Notion-style tag colors
  const getTagStyle = (tag) => {
    const tagStyles = {
      'JavaScript': 'bg-yellow-50 text-yellow-700 border-yellow-200',
      'TypeScript': 'bg-blue-50 text-blue-700 border-blue-200',
      'React': 'bg-cyan-50 text-cyan-700 border-cyan-200',
      'Vue': 'bg-green-50 text-green-700 border-green-200',
      'Python': 'bg-emerald-50 text-emerald-700 border-emerald-200',
      'Java': 'bg-red-50 text-red-700 border-red-200',
      'CSS': 'bg-indigo-50 text-indigo-700 border-indigo-200',
      'HTML': 'bg-orange-50 text-orange-700 border-orange-200',
      'Node.js': 'bg-lime-50 text-lime-700 border-lime-200',
      'default': 'bg-notion-gray-50 text-notion-gray-600 border-notion-gray-200'
    };
    return tagStyles[tag] || tagStyles.default;
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card
      className="group overflow-hidden"
      padding="none"
      hover={true}
    >
      {/* Card Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-3">
          <motion.h3 
            className="text-lg font-semibold notion-text-primary group-hover:text-notion-blue transition-colors duration-200 line-clamp-1"
            whileHover={{ scale: 1.02 }}
          >
            <a
              href={project.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {project.name || project.full_name}
            </a>
          </motion.h3>
          
          {/* Star Count */}
          {project.stargazers_count !== undefined && (
            <motion.div 
              className="flex items-center space-x-1 text-notion-gray-500 bg-notion-gray-50 px-2 py-1 rounded-notion-sm"
              whileHover={{ scale: 1.05 }}
            >
              <Star className="w-4 h-4 fill-current" />
              <span className="text-sm font-medium">{project.stargazers_count}</span>
            </motion.div>
          )}
        </div>

        {/* Description */}
        <p className="notion-text-secondary text-sm leading-relaxed mb-4 line-clamp-2">
          {project.description || 'No description available'}
        </p>

        {/* Tags */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {allTags.slice(0, 4).map((tag) => (
              <motion.span
                key={tag}
                whileHover={{ scale: 1.05 }}
                className={`px-2 py-1 text-xs font-medium rounded-notion-sm border transition-colors duration-200 ${getTagStyle(tag)}`}
              >
                {tag}
              </motion.span>
            ))}
            {allTags.length > 4 && (
              <span className="px-2 py-1 text-xs font-medium rounded-notion-sm border bg-notion-gray-50 text-notion-gray-500 border-notion-gray-200">
                +{allTags.length - 4}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Card Footer */}
      <div className="px-6 py-4 bg-notion-gray-25 border-t border-notion-gray-100">
        <div className="flex items-center justify-between">
          {/* Last Updated */}
          <div className="flex items-center space-x-1 text-notion-gray-500">
            <Calendar className="w-3.5 h-3.5" />
            <span className="text-xs">
              {project.updated_at ? formatDate(project.updated_at) : 'Unknown'}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <Button
              variant="secondary"
              size="small"
              onClick={() => window.open(project.html_url, '_blank')}
              className="flex items-center space-x-2"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </Button>
            {project.homepage && (
              <Button
                variant="primary"
                size="small"
                onClick={() => window.open(project.homepage, '_blank')}
                className="flex items-center space-x-2"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Demo</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;