// ==========================================
// SmartSense Product Page JavaScript
// Pipeline Visualization & Interactions
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    initPipelineAnimation();
    initArchitectureCards();
    initPrivacyDiagram();
});

// ==========================================
// Pipeline Animation
// ==========================================
function initPipelineAnimation() {
    const stages = document.querySelectorAll('.pipeline-stage');

    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');

                    // Animate stage number
                    const stageNumber = entry.target.querySelector('.stage-number');
                    if (stageNumber) {
                        stageNumber.style.animation = 'scaleIn 0.5s ease-out';
                    }

                    // Animate connector
                    const connector = entry.target.querySelector('.stage-connector');
                    if (connector) {
                        setTimeout(() => {
                            connector.style.width = '60px';
                            connector.style.opacity = '1';
                        }, 400);
                    }
                }, index * 200);
            }
        });
    }, observerOptions);

    stages.forEach(stage => {
        stage.querySelector('.stage-connector')?.style.setProperty('width', '0');
        stage.querySelector('.stage-connector')?.style.setProperty('opacity', '0');
        stage.querySelector('.stage-connector')?.style.setProperty('transition', 'all 0.5s ease-out');
        observer.observe(stage);
    });
}

// ==========================================
// Architecture Cards Interaction
// ==========================================
function initArchitectureCards() {
    const archCards = document.querySelectorAll('.arch-card');

    archCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.arch-icon');
            if (icon) {
                icon.style.animation = 'bounce 0.5s ease-out';
            }
        });

        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.arch-icon');
            if (icon) {
                icon.style.animation = 'none';
            }
        });
    });
}

// ==========================================
// Privacy Diagram Animation
// ==========================================
function initPrivacyDiagram() {
    const layers = document.querySelectorAll('.diagram-layer');

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const layerBars = entry.target.querySelectorAll('.layer-bar');
                layerBars.forEach((bar, index) => {
                    setTimeout(() => {
                        bar.style.transform = 'scaleX(1)';
                        bar.style.transformOrigin = 'left';
                        bar.style.transition = 'transform 0.8s ease-out';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    const diagram = document.querySelector('.privacy-diagram');
    if (diagram) {
        // Initialize bars at scale 0
        const bars = diagram.querySelectorAll('.layer-bar');
        bars.forEach(bar => {
            bar.style.transform = 'scaleX(0)';
        });

        observer.observe(diagram);
    }
}

// ==========================================
// Pipeline Stage Details Modal
// ==========================================
function showStageDetails(stageNumber) {
    const stageData = {
        1: {
            title: 'Data Ingestion',
            description: 'Comprehensive multi-source data collection supporting industrial protocols including MQTT, OPC-UA, ROS/ROS2, and Modbus.',
            features: [
                'Real-time data streaming',
                'Protocol auto-discovery',
                'Data buffering and queuing',
                'Connection redundancy',
                'Automatic reconnection'
            ]
        },
        2: {
            title: 'Data Preprocessing',
            description: 'Advanced data cleaning, normalization, and feature extraction optimized for industrial sensor data.',
            features: [
                'Noise filtering',
                'Data normalization',
                'Feature extraction',
                'Outlier detection',
                'Time-series alignment'
            ]
        },
        3: {
            title: 'AI Inference Engine',
            description: 'High-performance offline AI processing with quantized models optimized for edge deployment.',
            features: [
                'INT4/INT8 quantization',
                'GPU acceleration (CUDA/Vulkan)',
                '3B-13B parameter models',
                'Sub-50ms latency',
                'Batch processing support'
            ]
        },
        4: {
            title: 'Post-Processing',
            description: 'Result validation, confidence scoring, and output formatting for downstream systems.',
            features: [
                'Confidence thresholding',
                'Result validation',
                'Output formatting',
                'Error handling',
                'Logging and auditing'
            ]
        },
        5: {
            title: 'Action & Storage',
            description: 'Automated response execution and secure local data storage with encryption.',
            features: [
                'Alert generation',
                'API response delivery',
                'Encrypted storage (AES-256)',
                'Configurable retention',
                'Audit logging'
            ]
        }
    };

    const data = stageData[stageNumber];
    if (data) {
        // Create and show modal (implementation depends on your modal system)
        console.log('Stage details:', data);
    }
}

// ==========================================
// Interactive Pipeline Metrics
// ==========================================
function updatePipelineMetrics() {
    const metrics = {
        processing_time: Math.floor(Math.random() * 20) + 10,
        accuracy: 99.0 + Math.random() * 0.9,
        throughput: Math.floor(Math.random() * 200) + 900
    };

    // Update metric displays
    Object.keys(metrics).forEach(key => {
        const element = document.querySelector(`[data-metric="${key}"]`);
        if (element) {
            element.textContent = metrics[key];
        }
    });
}

// ==========================================
// Use Case Filters
// ==========================================
function initUseCaseFilters() {
    const filters = document.querySelectorAll('.use-case-filter');
    const cards = document.querySelectorAll('.use-case-card');

    filters.forEach(filter => {
        filter.addEventListener('click', function() {
            const category = this.dataset.category;

            // Update active filter
            filters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');

            // Filter cards
            cards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease-out';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// ==========================================
// Specification Table Interactions
// ==========================================
function initSpecTable() {
    const rows = document.querySelectorAll('.spec-table tbody tr');

    rows.forEach(row => {
        row.addEventListener('click', function() {
            // Remove highlight from all rows
            rows.forEach(r => r.classList.remove('highlighted'));

            // Highlight clicked row
            this.classList.add('highlighted');

            // Show additional details (if available)
            const details = this.dataset.details;
            if (details) {
                console.log('Row details:', details);
            }
        });
    });
}

// ==========================================
// Model Comparison Tool
// ==========================================
function initModelComparison() {
    const models = [
        { size: '3B', memory: '4GB', latency: '10-20ms', useCase: 'Edge devices' },
        { size: '7B', memory: '8GB', latency: '20-50ms', useCase: 'Standard deployment' },
        { size: '13B', memory: '16GB', latency: '50-100ms', useCase: 'Complex reasoning' }
    ];

    // Add comparison functionality
    const compareBtn = document.querySelector('.model-compare-btn');
    if (compareBtn) {
        compareBtn.addEventListener('click', function() {
            console.log('Model comparison:', models);
        });
    }
}

// ==========================================
// Export functions
// ==========================================
window.smartsense = {
    showStageDetails,
    updatePipelineMetrics,
    initUseCaseFilters,
    initSpecTable,
    initModelComparison
};
