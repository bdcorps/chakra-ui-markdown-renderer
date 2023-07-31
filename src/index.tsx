import { LinkIcon } from '@chakra-ui/icons';
import {
  Alert,
  Box,
  Button, Code,
  Divider,
  Heading,
  HStack,
  Image,
  Link,
  LinkBox,
  LinkOverlay,
  ListItem,
  OrderedList,
  Text,
  UnorderedList,
  useClipboard,
  useColorMode,
  VStack
} from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';
import Highlight from 'react-highlight';
import { encodeSlug } from './utils';

// for outside for image 
const CustomImage = (props: any) => {
  return (
    <VStack w="full" align="center">
      <Image
        width={props.width}
        height={props.height}
        src={props.src}
        alt={props.alt}
        my={6}
      />
      <Text color="gray.500" fontSize="sm">{props.alt}</Text>
    </VStack>
  );
};

const CustomLink = (props: any) => {
  const href = props.href;
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

  if (isInternalLink) {
    return (
      <NextLink href={href} passHref>
        <Link color="black" textDecoration="underline" textDecorationColor="brand.500" textUnderlineOffset="4px" {...props} />
      </NextLink>
    );
  }

  return <Link color="black" textDecoration="underline" textDecorationColor="brand.500" textUnderlineOffset="4px" isExternal {...props} />;
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

  const language = (children?.length > 0 && (children[0] as any).props > 0) ? getLanguageFromCodeBlock((children[0] as any)?.props?.className) : "language-plaintext";

  return (
    <Box fontSize="0.84em" position="relative"
      my={{ base: 2, md: 3 }}>
      <Button
        onClick={onCopy}
        color="white"
        backgroundColor="brand.500"
        position="absolute"
        top={3}
        right={3}
        size="xs"
        _hover={{ color: 'white', backgroundColor: 'brand.600' }}
      >
        {hasCopied ? 'Copied!' : 'Copy'}
      </Button>
      <Box w="full" backgroundColor="gray.50" fontSize="0.85rem" rounded="md">
        <Highlight className={`code-block ${language}`}>{text}</Highlight>
      </Box>
    </Box>
  );
};

export const flatten = (text: any, child: any): any => {
  return typeof child === 'string'
    ? text + child
    : React.Children.toArray(child.props.children).reduce(flatten, text);
};

export const getLanguageFromCodeBlock = (child: any): any => {
  return child.props.className?.replace('language-', '');
};

const DocsHeading = (props: any) => {
  var children = React.Children.toArray(props.children);
  var text = children.reduce(flatten, '');
  var slug = encodeSlug(text);

  if (!text) {
    return <></>;
  }

  return (<LinkBox as='article' role='group'>
    <LinkOverlay href={`#${slug}`}>
      <HStack w="full" spacing={2} align="baseline" justify="flex-start">
        <Heading id={slug} css={{ scrollMarginTop: '24px' }}{...props}>
          {text}
        </Heading>

        <LinkIcon display="none" _groupHover={{ display: "inline" }} />
      </HStack>
    </LinkOverlay>
  </LinkBox>
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
      mb={{ base: 4, md: 4 }}
      textAlign="left"
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
      mb={{ base: 3, md: 3 }}
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
      mb={{ base: 3, md: 3 }}
      {...props}
    />
  ),
  //eslint-disable-next-line
  h4: (props: any) => (
    <DocsHeading
      as="h4"
      fontSize={{ base: 'sm', md: 'md' }}
      fontWeight="bold"
      mt={{ base: 2, md: 2 }}
      mb={1}
      {...props}
    />
  ),
  //eslint-disable-next-line
  h5: (props: any) => (
    <DocsHeading as="h5" size="xs" fontWeight="bold"
      mt={{ base: 2, md: 2 }}
      mb={1}
      {...props} />
  ),
  //eslint-disable-next-line
  h6: (props: any) => (
    <DocsHeading as="h6" size="xs" fontWeight="bold"
      mt={{ base: 2, md: 2 }}
      mb={1}
      {...props} />
  ),
  //eslint-disable-next-line
  code: (props: any) => {
    return (
      <Code
        colorScheme="gray"
        fontSize="0.84em"
        color="gray.700"
        border="1px"
        borderColor="gray.100"
        backgroundColor="gray.50"
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
    <Text as="p" my={2} lineHeight="taller" color="gray.600" {...props} />
  ),
  //eslint-disable-next-line
  ul: (props: any) => (
    <UnorderedList as="ul" pt={2} pl={4} ml={2} spacing={1} {...props} ordered="true" color="gray.600" />
  ),
  //eslint-disable-next-line
  ol: (props: any) => (
    <OrderedList pt={2} pl={4} ml={2} spacing={1} {...props} ordered="true" color="gray.600" />
  ),
  //eslint-disable-next-line
  li: (props: any) => <ListItem as="li" pb={1} {...props} ordered="true" />,
  blockquote: Quote,
  img: CustomImage,
  hr: Hr,
  a: CustomLink,
};

export { CustomLink };

export default MDXComponents;
