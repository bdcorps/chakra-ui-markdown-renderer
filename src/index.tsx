import {
  Alert,
  Box,
  Button,
  Code,
  Divider,
  Heading,
  Image,
  Link,
  ListItem,
  OrderedList,
  Text,
  UnorderedList,
  useClipboard,
  useColorMode,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';
import Highlight from 'react-highlight';
import { encodeSlug } from './utils';

const CustomImage = (props: any) => {
  return (
    <Image
      width={props.width}
      height={props.height}
      src={props.src}
      alt={props.alt}
      my={6}
    />
  );
};

const CustomLink = (props: any) => {
  const { colorMode } = useColorMode();
  const color = {
    light: 'brand.500',
    dark: 'brand.500',
  };

  const href = props.href;
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

  if (isInternalLink) {
    return (
      <NextLink href={href} passHref>
        <Link color={color[colorMode]} {...props} />
      </NextLink>
    );
  }

  return <Link color={color[colorMode]} isExternal {...props} />;
};

const Quote = (props: any) => {
  return (
    <Alert
      mt={4}
      w="98%"
      colorScheme="brand"
      backgroundColor="white"
      variant="left-accent"
      css={{
        '> *:first-of-type': {
          marginTop: 0,
          marginLeft: 8,
        },
      }}
      {...props}
    />
  );
};

const CodeBlock = (props: any) => {
  var children = React.Children.toArray(props.children);
  var text = children.reduce(flatten, '');
  const { onCopy, hasCopied } = useClipboard(text);

  return (
    <Box fontSize="0.84em" position="relative">
      <Button
        onClick={onCopy}
        colorScheme="brand"
        backgroundColor="brand.300"
        position="absolute"
        top={3}
        right={3}
        size="xs"
        opacity={0.8}
        _hover={{ backgroundColor: 'brand.400', opacity: 1 }}
      >
        {hasCopied ? 'Copied!' : 'Copy'}
      </Button>
      <Box w="full" backgroundColor="gray.50" fontSize="0.85rem">
        <Highlight>{text}</Highlight>
      </Box>
    </Box>
  );
};

const flatten = (text: any, child: any): any => {
  return typeof child === 'string'
    ? text + child
    : React.Children.toArray(child.props.children).reduce(flatten, text);
};

const DocsHeading = (props: any) => {
  var children = React.Children.toArray(props.children);
  var text = children.reduce(flatten, '');
  var slug = encodeSlug(text);

  return (
    <Heading {...props} id={slug} css={{ scrollMarginTop: '100px' }}>
      {props.children}
    </Heading>
  );
};

const Hr = () => {
  const { colorMode } = useColorMode();
  const borderColor = {
    light: 'gray.200',
    dark: 'gray.600',
  };

  return <Divider borderColor={borderColor[colorMode]} my={4} w="100%" />;
};

const MDXComponents = {
  //eslint-disable-next-line
  h1: (props: any) => (
    <Heading
      as="h1"
      fontSize={{ base: '3xl', md: '4xl' }}
      my={4}
      lineHeight={1.3}
      mb={{ base: 8, md: 10 }}
      {...props}
    />
  ),
  //eslint-disable-next-line
  h2: (props: any) => (
    <DocsHeading
      as="h2"
      fontSize={{ base: 'xl', md: '2xl' }}
      fontWeight={600}
      mt={{ base: 12, md: 14 }}
      mb={{ base: 6, md: 8 }}
      {...props}
    />
  ),
  //eslint-disable-next-line
  h3: (props: any) => (
    <DocsHeading
      as="h3"
      fontSize={{ base: 'lg', md: 'xl' }}
      fontWeight={600}
      mt={{ base: 8, md: 10 }}
      mb={{ base: 3, md: 4 }}
      {...props}
    />
  ),
  //eslint-disable-next-line
  h4: (props: any) => (
    <DocsHeading
      as="h4"
      fontSize={{ base: 'sm', md: 'md' }}
      fontWeight="bold"
      mt={{ base: 6, md: 8 }}
      mb={2}
      {...props}
    />
  ),
  //eslint-disable-next-line
  h5: (props: any) => (
    <DocsHeading as="h5" size="xs" fontWeight="bold" {...props} />
  ),
  //eslint-disable-next-line
  h6: (props: any) => (
    <DocsHeading as="h6" size="xs" fontWeight="bold" {...props} />
  ),
  //eslint-disable-next-line
  code: (props: any) => {
    return (
      <Code
        colorScheme="brand"
        fontSize="0.84em"
        color="brand.500"
        backgroundColor="brand.50"
        opacity={0.8}
      >
        {props.children}
      </Code>
    );
  },
  pre: (props: any) => <CodeBlock>{props.children}</CodeBlock>,
  //eslint-disable-next-line
  br: (props: any) => <Box height="24px" {...props} />,
  //eslint-disable-next-line
  p: (props: any) => (
    <Text as="p" my={2} lineHeight="tall" color="gray.600" {...props} />
  ),
  //eslint-disable-next-line
  ul: (props: any) => (
    <UnorderedList as="ul" pt={2} pl={4} ml={2} {...props} ordered="true" />
  ),
  //eslint-disable-next-line
  ol: (props: any) => (
    <OrderedList pt={2} pl={4} ml={2} {...props} ordered="true" />
  ),
  //eslint-disable-next-line
  li: (props: any) => <ListItem as="li" pb={1} {...props} ordered="true" />,

  // ul: (props: any) => <Box>ul</Box>,
  // //eslint-disable-next-line
  // ol: (props: any) => <Box>ol</Box>,
  // //eslint-disable-next-line
  // li: (props: any) => <Box>li</Box>,
  blockquote: Quote,
  img: CustomImage,
  hr: Hr,
  a: CustomLink,
};

export { CustomLink };

export default MDXComponents;
